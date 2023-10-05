'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { type UseFormReturn, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import useHubSpot from '@/adapters/useCase/useHubSpot'
import {
  MultiLine,
  PartnersRegisterForm,
} from '@/app/[locale]/partners/register/register.css'
import Button from '@/components/button'
import Checkbox from '@/components/checkBox'
import Input from '@/components/input'
import Select from '@/components/select'
import TextArea from '@/components/textArea'
import TextButton from '@/components/textButton'
import topicGuide from '@/data/topicGuide'
import { sprinkles } from '@/styles/_foundations/sprinkles.css'
import useRegionPath from '@/utils/useRegionPath'

import { type ValidationSchema, contactFormSchema, topicOptions } from './types'

const InputElement = ({
  children,
  keyName,
  forms,
  placeholder,
}: {
  children: React.ReactNode
  keyName: keyof ValidationSchema
  forms: UseFormReturn<ValidationSchema>
  placeholder?: string
}): React.ReactElement => {
  const {
    register,
    formState: { errors },
  } = forms

  return (
    <div>
      <Input.Label required>{children}</Input.Label>
      <Input color={errors[keyName]?.message ? 'red' : 'secondary'}>
        <Input.Text {...register(keyName)} placeholder={placeholder} />
      </Input>
      {errors[keyName]?.message && (
        <Input.Message color="red">{errors[keyName]?.message}</Input.Message>
      )}
    </div>
  )
}

const RegisterForm = () => {
  const { regionPath } = useRegionPath()
  const router = useRouter()
  const query = useSearchParams()
  const { contactUs } = useHubSpot(regionPath)
  const activeTopic = query?.get('topic') || ''

  const [responsiveValues, setResponsiveValues] = useState({
    description: '',
    subject: '',
  })

  const forms = useForm<ValidationSchema>({
    mode: 'all',
    defaultValues: { topic: activeTopic },
    resolver: zodResolver(contactFormSchema),
  })
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors, isLoading },
  } = forms
  const { topic } = watch()

  useEffect(() => {
    router.push(`?topic=${topic}`)
  }, [topic])

  useEffect(() => {
    if (!activeTopic) setValue('topic', '')
    const topicOption = topicOptions.find(({ value }) => value === activeTopic)

    if (!topicOption) return
    const { value } = topicOption
    const { description, subject } = topicGuide[value]
    setResponsiveValues({ description, subject })
  }, [activeTopic])

  return (
    <form
      onSubmit={handleSubmit(data => contactUs(data))}
      className={PartnersRegisterForm}
    >
      <div className={MultiLine}>
        <InputElement keyName="email" forms={forms}>
          E-mail
        </InputElement>

        <div>
          <Select>
            <Select.Label required>
              Topic
            </Select.Label>
            <Select.HookForm
              {...register('topic')}
              values={topicOptions}
              activeValue={topic}
              setValue={setValue}
              color={errors.topic?.message ? 'red' : 'secondary'}
            >
              {topicOptions.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select.HookForm>
          </Select>
          {errors.topic?.message && (
            <Input.Message color="red">
              * Topic is required.
            </Input.Message>
          )}
        </div>
      </div>

      <InputElement
        keyName="subject"
        forms={forms}
        placeholder={responsiveValues.subject}
      >
        Subject
      </InputElement>
      <div>
        <TextArea.Label required>
          Description
        </TextArea.Label>
        <TextArea>
          <TextArea.Text
            {...register('description')}
            color={errors.description?.message ? 'red' : 'secondary'}
            defaultValue={responsiveValues.description}
          />
        </TextArea>
        {errors.description?.message && (
          <Input.Message color="red">
            {errors.description?.message}
          </Input.Message>
        )}
      </div>

      <div
        className={sprinkles({
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        })}
      >
        <Checkbox>
          <Checkbox.Input {...register('policyCheck')} />
          <p>
            By submitting this form, you confirm that you have read and agree to
            <TextButton href={`/${regionPath}/legal?type=terms-and-conditions`}>
              Terms and Conditions
            </TextButton>{' '}
            and{' '}
            <TextButton
              required
              href={`/${regionPath}/legal?type=privacy-policy`}
            >
              Privacy Policy
            </TextButton>
            .
          </p>
        </Checkbox>
        {errors.policyCheck?.message && (
          <Input.Message
            color="red"
            className={sprinkles({ marginTop: '-4', marginLeft: 28 })}
          >
            * Policy Check is required.
          </Input.Message>
        )}
        <Checkbox>
          <Checkbox.Input {...register('marketingCheck')} />
          Keep me updated on news and offers.
        </Checkbox>
      </div>
      <Button
        type="submit"
        size="lg"
        loading={String(isLoading) as 'true' | 'false'}
      >
        Submit
      </Button>
    </form>
  )
}

export default RegisterForm
