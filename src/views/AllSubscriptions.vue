<template>
    <div class="container mx-auto">
        <div class="flex flex-col">
            <div class="-m-1.5 overflow-x-auto">
                <div v-if="error" class="p-1.5 min-w-full inline-block align-middle">
                    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong class="font-bold">Error: </strong>
                        <span class="block sm:inline">{{ error.response.data.detail }}</span>
                        <span class="absolute top-0 bottom-0 right-0 px-4 py-3" @click="closeErrorMessage()">
                            <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                        </span>
                    </div>
                </div>
                <div class="p-1.5 min-w-full inline-block align-middle">
                    <div v-if="subscriptions" class="overflow-hidden">
                        <table class="min-w-full divide-y divide-purple-200 dark:divide-purple-700">
                        <thead>
                            <tr>
                                <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-purple-800 uppercase">Name</th>
                                <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-purple-800 uppercase">Description</th>
                                <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-purple-800 uppercase">Price</th>
                                <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-purple-800 uppercase">Duration</th>
                                <th scope="col" class="px-6 py-3 text-end text-xs font-medium text-purple-800 uppercase">Action</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-purple-200 dark:divide-purple-700">
                            <tr v-for="subscription in subscriptions" :key="subscription.id">
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-purple-800">{{ subscription.name }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-purple-800 dark:text-purple-600">{{ subscription.description }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-purple-800 dark:text-purple-600">{{ subscription.price }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-purple-800 dark:text-purple-600">{{ subscription.duration }}</td>
                                <td v-if="isLoggedIn" class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                    <button 
                                        @click="subscribe(subscription.id)" 
                                        type="button" 
                                        class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">Subscribe</button>
                                </td>
                                <td v-else class="px-6 py-4 whitespace-nowrap text-sm text-purple-800 dark:text-purple-600">Login To Subscribe</td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    <div v-else>
                        Loading...
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    msg: String
  },

  data() {
    return {
      subscriptions: '',
      isLoggedIn: !!localStorage.getItem('token'),
      error: ''
    }
  },
  beforeMount() {
    this.getSubscriptions();
  },
  methods: {
    async getSubscriptions() {
        try {
            //const bearer_token = `Bearer ${localStorage.getItem('token')}`;

            const response = await axios.get('http://127.0.0.1:8000/api/subscriptions', {}, {
                headers: {
                    //'Authorization': bearer_token,
                    'Content-Type': 'application/json'
                }
            });

            this.subscriptions = response.data.subscriptions
        } catch (error) {
            console.error('Api Error: ', error);
        }
    },

    async subscribe(subscription_id) {
        try {   
            const bearer_token = `Bearer ${localStorage.getItem('token')}`;

            const response = await axios.post('http://127.0.0.1:8000/api/subscriptions/' + subscription_id + '/subscribe', {}, {
                headers: {
                    'Authorization': bearer_token,
                    'Content-Type': 'application/json'
                }
            });

            console.log(response);
        } catch (error) {
            this.error = error
            console.error('Api Error: ', error);
        }
    },
    closeErrorMessage(){
        this.error = null
    }
  }
}
</script>