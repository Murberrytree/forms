import Image from 'next/image'
import { getDictionary } from 'root/get-dictionary'

import { PartnersRegisterWrapper } from '@/app/[locale]/partners/register/register.css'
import BannerBg from '@/assets/images/common/top-bg-light-360.png'
import HeadingBanner from '@/components/banner/headingBanner'
import { sprinkles } from '@/styles/_foundations/sprinkles.css'
import { lightTheme } from '@/styles/_themes/theme.css'
import { localeToLang } from '@/types/const/locales'
import { initMetadata, MetadataProps } from '@/utils/initMetadata'

import Forms from './Forms'

export function generateMetadata({ params }: MetadataProps) {
  return initMetadata(
    'Contact Us | Get in touch with SQUARS',
    'If you have any questions or technical problems, please let us know.',
    'contact',
    `/${params.locale}/partners`,
  )
}

const Contact = async ({ params }: { params: { locale: LocalesUrl } }) => {
  const { company } = await getDictionary(
    localeToLang(params.locale),
    'company',
  )
  return (
    <div className={lightTheme}>
      <HeadingBanner
        bg={BannerBg}
        className={sprinkles({ alignItems: 'flex-end' })}
      >
        <HeadingBanner.Contents>
          <h3
            className={sprinkles({
              fontSize: { default: 'heading.xxl', desktop: 'heading.lg' },
              fontWeight: 'regular',
              textAlign: 'left',
              color: 'blue500',
            })}
          >
            {company.contactPage.title}
          </h3>

          <p
            className={sprinkles({
              fontSize: { default: 'label.lg', desktop: 'label.md' },
              color: 'text700',
              paddingBottom: { desktop: 40 },
            })}
          >
            {company.contactPage.desc1}
            <br />
            {company.contactPage.desc2}
          </p>
        </HeadingBanner.Contents>
        <Image
          src="https://picsum.photos/660/240"
          width="660"
          height="240"
          alt="Global people"
          className={sprinkles({ display: { desktop: 'none' } })}
        />
        <Image
          src="https://picsum.photos/660/240"
          fill
          alt="Global people"
          className={sprinkles({
            display: { default: 'none', desktop: 'block' },
          })}
        />
      </HeadingBanner>
      <div className={PartnersRegisterWrapper}>
        <Forms />
      </div>
    </div>
  )
}

export default Contact
