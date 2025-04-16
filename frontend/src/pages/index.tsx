import type { GetServerSideProps } from "next"
import Head from "next/head"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { CarList } from "@/components/CarList"
import { PromotionList } from "@/components/PromotionList"
import { fetchCars, fetchPromotions } from "@/utils/api"
import type { Car, Promotion } from "@/types"
import styles from "./HomePage.module.css"

interface HomePageProps {
  cars: Car[]
  promotions: Promotion[]
}

export default function HomePage({ cars, promotions }: HomePageProps) {
  const { t } = useTranslation("common")

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    name: "ДЦ Орехово",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ореховый бульвар, 15",
      addressLocality: "Москва",
      addressRegion: "Москва",
      postalCode: "115582",
      addressCountry: "RU",
    },
    telephone: "+7 (495) 123-45-67",
    url: "https://www.dc-orehovo.ru",
    openingHours: "Mo-Su 09:00-21:00",
  }

  return (
    <>
      <Head>
        <title>{t("title")}</title>
        <meta name="description" content={t("description")} />
        <link rel="canonical" href="https://www.dc-orehovo.ru/" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={t("title")} />
        <meta property="og:description" content={t("description")} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.dc-orehovo.ru/" />
        <meta property="og:image" content="https://www.dc-orehovo.ru/og-image.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Head>
      <main className={styles.mainContent}>
        <h1 className={styles.pageTitle}>{t("title")}</h1>

        <section aria-labelledby="featured-cars" className={styles.section}>
          <h2 id="featured-cars" className={styles.sectionTitle}>
            {t("featuredCars")}
          </h2>
          <CarList cars={cars} />
        </section>

        <section aria-labelledby="current-promotions" className={styles.section}>
          <h2 id="current-promotions" className={styles.sectionTitle}>
            {t("currentPromotions")}
          </h2>
          <PromotionList promotions={promotions} />
        </section>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<HomePageProps> = async ({ locale }) => {
  try {
    // Fetch cars and promotions in parallel
    const [cars, promotions] = await Promise.all([fetchCars(), fetchPromotions()])

    return {
      props: {
        ...(await serverSideTranslations(locale ?? "ru", ["common"])),
        cars,
        promotions,
      },
    }
  } catch (error) {
    console.error("Error fetching data:", error)

    // Return empty arrays if data fetching fails
    return {
      props: {
        ...(await serverSideTranslations(locale ?? "ru", ["common"])),
        cars: [],
        promotions: [],
      },
    }
  }
}

