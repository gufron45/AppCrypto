<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Cuaca (Jakarta)</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
        <div id="container">
            <p>Temperature Per Jam di Jakarta</p>

            <p v-if="loading">loading....</p>

            <table class="center" v-if="!loading && dataUsers.length">
                <thead>
                <tr>
                    <th>Waktu (WIB)</th>
                    <th>Temperature (°C)</th>
                </tr>
                </thead>

                <tbody>
                    <tr v-for="hour in dataUsers" :key="hour.time">
                    <td> {{ hour.time }}</td>
                    <td>{{ hour.temperature_2m }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent} from 'vue';
import EndPointAccess from '../services/EndPointAccess';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';

type HourItem = {time: string; temperature_2m: number | null}

export default defineComponent ({
    name: 'CuacaPage',
    components: {IonContent, IonHeader, IonPage, IonTitle, IonToolbar },
    data() {
        return {
            dataUsers: [] as HourItem [],
            loading: false,
        }
    },
    mounted() {
        this.ambilData()
    },
    methods: {
        async ambilData () {
            this.loading = true
            const api = new EndPointAccess ('https://api.open-meteo.com/v1/forecast?latitude=-6.2&longitude=106.8&hourly=temperature_2m')
            const data = await api.getRes()

            if (data && data.hourly) {
                const times: string[] = data.hourly.time
                const temps: number[] = data.hourly.temperature_2m

                this.dataUsers = times.slice (0, 24).map((t, i) => {
                    const dt = new Date(t)
                    const formatted = dt.toLocaleString('id-ID',{
                        timeZone: 'Asia/Jakarta',
                        hour: '2-digit',
                        minute: '2-digit',
                    })
                    return {
                        time: formatted,
                        temperature_2m: temps[i] ?? null,
                    }
                })
            }
            this.loading = false
        }
    }
})
</script>

<style scoped>
#container {
  text-align: center;
  
  position: relative;
  margin-top: 20px;
}

.center {
    margin-left: auto;
    margin-right:auto;
    width: 95%;
    max-width: 900px;
    border-collapse: collapse;
}
.center th,
.center td{
    border:1px solid black;
    padding: 8px;
}
.center th {
    background: white;
}


</style>
