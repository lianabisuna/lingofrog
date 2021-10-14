<template>
  <main class="app-home px-4">
    <div class="d-flex align-center py-5">
      <span>6 of 120 languages</span>

      <v-spacer></v-spacer>

      <v-btn-toggle>
        <v-btn text>
          <v-icon>mdi-view-module-outline</v-icon>
        </v-btn>

        <v-btn text>
          <v-icon>mdi-view-sequential-outline</v-icon>
        </v-btn>
      </v-btn-toggle>
    </div>

    <div :style="{ minHeight: '75vh' }">
      <v-row>
        <v-col
          v-for="(item,key) in translations"
          :key="key"
          cols="12" md="6" lg="4" xl="3"
          class="d-flex"
        >
          <AppCard
            :src="item.src"
            :language="item.lang"
            :translation="item.trans"
          />
        </v-col>
        
        <v-col
          cols="12" md="6" lg="4" xl="3"
          class="d-flex"
        >
          <ButtonCard />
        </v-col>
      </v-row>
    </div>
  </main>
</template>

<script>
  import AppCard from '../components/AppCard'
  import ButtonCard from '../components/ButtonCard'

  export default {
    name: 'Home',

    components: {
      AppCard,
      ButtonCard
    },

    data: () => ({
      translations: [
        { trans: '你好', lang: 'Chinese', src: 'https://www.countryflags.com/wp-content/uploads/philippines-flag-png-xl.png' },
        { trans: '你好', lang: 'Korean', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/255px-Flag_of_South_Korea.svg.png' },
        { trans: '你好', lang: 'Japanese', src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAflBMVEX///+8AC23AAC7ACe7ACm4ABW5ABu4ABC6ACO5ABm7ACi4ABO6ACL46u3sx83NYXG3AAfnvcL14OTiqLH78fPKVGbEOE/9+PnGQFbjrbX35OjnuL/x09jsxszpv8XfoarSc4HXhZHAHj3CK0bbkJvQanm/DzbUeYbemqS/FjiKuKh1AAADpUlEQVR4nO3diXaiMBSA4QJCUFxwQ63WurTavv8LDtSZozZxipiQE/p/D+Dh3hOTS8jy9AQAAAAAAAAAAAAAAAAAAAqT3uplPRwO1y+r3sT2w1g3679usiBMRRIWEpGGQbZ57f/WzMz6272fRN1Oy7vU6nSjxN9v+zPbD1i74aAtutfZuMpMV7QHS9sPWafVMUnim/n4Jw6Tzcr2o9ZkPfe7PybkpOtna9uPW4PlTgQlM1IIxK7pf6H+TtzuRNRaYte3/dgG9ab+vRn5yoo/7dl+dFM+xM8dq1qcfth+eCN6WVIxI4Uka2BTWST3dK2yQCxsh6DbMX0oI4V0YzsIrWbz9sMp8bx21qB6v/dZtkj7v/izMZ3KKHqsKzkLopHtYPQYJVWKErWWaERSRqG+lORJCRuQlF6kMyV5UiLn+5SZ19GaEi//PddHn6xqOX9bnNkO6jHvkfaUeF70bjusRywer15V0rHtwKp79o2kxPP8Z9uhVbbXVat9F+xth1bVW2goJZ4XvtkOrhpj/5yC72bpNjf1zykEc9vhVbEUBlPiecLF6XxPb03/XetgO8D7jc11sCehe0VKbLaZ5A0lth3ivRamm0neUFybtN6ZbiZ5Q9nZDvI+fTMvOtdSt76ZDvRPEcjige0w7zGpo5nkDcWlNV5jHZ9zftZ2aTg2WtafuVTgT0y+/V3y3fnzLM0XJyehOy8973WMOoXYnZlZw69/Zy3PdqhlPdczEhdSVyZma+tOHOpQtnpWVpTR3doOtqRpPdVJIZ7aDrakQ11drEOzbXVVbAXfdrDl1DjsODPwrMxO2F8TbuzcWNc3FOeDsRv7Nhb1TBSctN2YlK1p8uRvTtyYQhmbWIdzS0ROyEmDckJ/ImHckVGfyKhjZbzvKPBeLGP+RMY8m4z5WBnz9jK+7yjwHVDG92IZ6wpkrD9RYJ2SjPVsMtY9KrA+VsY6agXW28vYl6HA/h0Z+7wUDM+2OTPDdsnwvtHUnVedC+wvlpndh+7MZNI1zitQ4FwLGeefKJg6J8e5CvbSxsh5ShvbYT2Gc7dks4PufrZzcP18Ns7xU+G8RwWt54ImjUgJ58cqcc6wAudRq+g4t/xoOwjdlnddHSILnDx87Afcg6DywH0Zopn3ZTxxr4oa9++ocE+TCvd5qayOYbl7345u7LrQ5Ot+wNtH33d+3f2AJ8U9kuLmPZIvzarjy7t13+hvzccZ99ICAAAAAAAAAAAAAAAAACD7A+PaSTdtOrdEAAAAAElFTkSuQmCC' },
        { trans: '你好', lang: 'French', src: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/1200px-Flag_of_France.svg.png' },
        { trans: '你好', lang: 'French', src: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/1200px-Flag_of_France.svg.png' }
      ]
    })
  }
</script>

<style lang="scss" scoped>
  @import '~vuetify/src/styles/settings/_variables';

  @media #{map-get($display-breakpoints, 'sm-and-down')} {
    .app-home {
      margin: 0;
    }
  }
  @media #{map-get($display-breakpoints, 'md-only')} {
    .app-home {
      margin: 0 1.5rem 0 1.5rem;
    }
  }
  @media #{map-get($display-breakpoints, 'lg-and-up')} {
    .app-home {
      margin: 0 3rem 0 3rem;
    }
  }
</style>