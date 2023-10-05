import { z } from 'zod'

import { Option } from '@/types/dto/Common'

export const topicOptions: Option[] = [
  { label: 'Bug report', value: 'bug-report' },
  { label: 'Feature request', value: 'feature-request' },
  { label: 'Feedback', value: 'feedback' },
  { label: 'Account', value: 'account' },
  { label: 'Subscription', value: 'subscription' },
  { label: 'Enterprise plan', value: 'enterprise-plan' },
  { label: 'Change plan', value: 'change-plan' },
  { label: 'Other?', value: 'other' },
]
//TODO : zod 에러 메시지도 i18n 이용하여 보여주기
export const contactFormSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: '* E-mail is required' })
      .email({ message: '* Not a valid Email format. Please check again.' }),
    topic: z.string().min(1),
    subject: z.string().min(1, { message: '* Subject is required.' }),
    description: z.string().min(1, { message: '* Description is required.' }),
    policyCheck: z.boolean({ required_error: '* Policy Check is required.' }),
    marketingCheck: z.boolean(),
  })
  .superRefine(({ policyCheck }, ctx) => {
    if (!policyCheck) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['policyCheck'],
      })
    }
  })

export type ValidationSchema = z.infer<typeof contactFormSchema> & {
  topic: string
}
