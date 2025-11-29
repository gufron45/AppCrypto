<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Cryptos (Global)</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <div id="container">
        <div class="top-controls">
          <ion-button @click="ambilData" :disabled="loading">
            <ion-icon slot="start" :name="loading ? 'refresh' : 'refresh'"></ion-icon>
            Refresh
          </ion-button>
        </div>

        <p v-if="loading" class="loading-text">mengambil data...</p>
        <p v-if="!loading && coins.length === 0" class="loading-text">tidak ada data</p>

        <div class="list-wrapper" v-if="!loading && coins.length">
          <div
            class="coin-card"
            v-for="coin in coins"
            :key="coin.id"
          >
            <div class="left">
              <div class="rank">Rank<br /><span class="rank-num">{{ coin.rank }}</span></div>
            </div>

            <div class="middle">
              <div class="name">{{ coin.name }}</div>
              <div class="symbol">{{ coin.symbol }}</div>
            </div>

            <div class="right">
              <div class="currency">USD</div>
              <div class="price">{{ formatPrice(coin.price_usd) }}</div>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/vue';

type CoinItem = {
  id: string;
  symbol: string;
  name: string;
  nameid?: string;
  rank: number;
  price_usd: string; 
  percent_change_24h?: string;
  percent_change_1h?: string;
  percent_change_7d?: string;
  market_cap_usd?: string;
  volume24?: number;
  csupply?: string;
};

export default defineComponent({
  name: 'CryptosPage',
  components: { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon },
  data() {
    return {
      coins: [] as CoinItem[],
      loading: false,
      apiUrl: 'https://api.coinlore.net/api/tickers/',
    };
  },
  mounted() {
    this.ambilData();
  },
  methods: {
    async ambilData() {
      try {
        this.loading = true;
        this.coins = [];
        const res = await fetch(this.apiUrl);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const json = await res.json();
      
        const raw: any[] = Array.isArray(json.data) ? json.data : [];
      
        this.coins = raw.slice(0, 50).map((c: any) => ({
          id: String(c.id),
          symbol: c.symbol,
          name: c.name,
          rank: Number(c.rank) || 0,
          price_usd: String(c.price_usd ?? '0'),
        }));
      } catch (err) {
        console.error('fetch error', err);
       
        this.coins = [];
      } finally {
        this.loading = false;
      }
    },
    formatPrice(priceStr: string) {
      const p = Number(priceStr);
      if (Number.isNaN(p)) return priceStr;
      // jika harga >= 1, tunjukan 2 desimal jika <1 tunjukan sampai 6 desimal
      if (Math.abs(p) >= 1) {
        return p.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      } else {
        return p.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 }).replace(/(\.\d*?[1-9])0+$/,'$1').replace(/\.0+$/,'');
      }
    },
  },
});
</script>

<style scoped>

#container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 8px;
}


.top-controls {
  width: 95%;
  max-width: 420px;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}


.loading-text {
  text-align: center;
  color: #666;
  margin: 10px 0;
}


.list-wrapper {
  width: 95%;
  max-width: 420px;
  margin-bottom: 24px;
}


.coin-card {
  display: grid;
  grid-template-columns: 1fr 2fr 1.6fr;
  align-items: center;
  gap: 12px;
  background: #fdeecb; 
  border: 1px solid #e2c87a;
  padding: 10px 12px;
  margin-bottom: 8px;
  border-radius: 2px;
  box-shadow: 0 0 0 3px rgba(0,0,0,0.0);
}


.left .rank {
  font-size: 12px;
  color: #333;
  text-align: left;
}
.rank-num {
  display: block;
  font-weight: 700;
  font-size: 20px;
  margin-top: 6px;
}


.middle .name {
  font-weight: 600;
  font-size: 14px;
  color: #222;
}
.middle .symbol {
  font-weight: 800;
  font-size: 26px;
  margin-top: 6px;
}


.right {
  text-align: right;
}
.right .currency {
  font-size: 12px;
  color: #333;
}
.right .price {
  font-weight: 800;
  font-size: 22px;
  margin-top: 6px;
}

/* untuk tampilan mobile dengan layar kecil */
@media (max-width: 360px) {
  .coin-card {
    grid-template-columns: 1fr 2fr;
    grid-auto-rows: auto;
  }
  .right {
    grid-column: 1 / -1;
    text-align: right;
    margin-top: 8px;
  }
}


ion-button {
  --border-radius: 8px;
  --background: #0275d8;
  --color: #fff;
  --padding-top: 6px;
  --padding-bottom: 6px;
  --padding-start: 20px;
  --padding-end: 20px;
  font-weight: 600;
}
</style>
