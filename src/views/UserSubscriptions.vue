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
                    <div v-if="user_subscriptions" class="overflow-hidden">
                        <table class="min-w-full divide-y divide-purple-200 dark:divide-purple-700">
                        <thead>
                            <tr>
                                <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-purple-500 uppercase">Name</th>
                                <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-purple-500 uppercase">Description</th>
                                <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-purple-500 uppercase">Status</th>
                                <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-purple-500 uppercase">Start</th>
                                <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-purple-500 uppercase">End</th>
                                <th scope="col" class="px-6 py-3 text-end text-xs font-medium text-purple-500 uppercase">Action</th>
                                </tr>
                        </thead>
                        <tbody class="divide-y divide-purple-200 dark:divide-purple-700">
                            <tr v-for="user_subscription in user_subscriptions" :key="user_subscription.id">
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-purple-800">{{ user_subscription.subscription_name }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-purple-800">{{ user_subscription.subscription_description }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-purple-800">{{ user_subscription.status }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-purple-800">{{ user_subscription.start_date.date }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-purple-800">{{ user_subscription.end_date.date }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                    <button @click="unsubscribe(user_subscription.id, key)" type="button" class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">Unsubscribe</button>
                                </td>
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
        user_subscriptions: '',
        error: '',
    }
  },
  beforeMount() {
    this.getSubscriptions();
  },
  methods: {
    async getSubscriptions() {
        try {
            const bearer_token = `Bearer ${localStorage.getItem('token')}`;

            const response = await axios.get('http://127.0.0.1:8000/api/subscriptions/me', {
                headers: {
                    'Authorization': bearer_token,
                    'Content-Type': 'application/json'
                }
            });

            console.log(response);

            this.user_subscriptions = response.data.user_subscriptions
        } catch (error) {
            console.error('Api Error: ', error);
        }
    },

    async unsubscribe(user_subscription_id, key) {
        try {       
            const bearer_token = `Bearer ${localStorage.getItem('token')}`;

            const response = await axios.post('http://127.0.0.1:8000/api/subscriptions/' + user_subscription_id + '/unsubscribe', {}, {
                headers: {
                    'Authorization': bearer_token,
                    'Content-Type': 'application/json'
                }
            });

            this.user_subscriptions.splice(key, 1);

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