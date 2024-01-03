<script setup>

import userService from '@/service/API/userService.js';
import TableComponent from '@/components/TableComponent.vue';

import { ref, onBeforeMount } from 'vue'

defineProps({
    users: Array,
})

const users = ref([])
const formatData = (data) => {
    try {
        return data.map(el => ({
            name: `${el.name.first} ${el.name.last}`,
            dob: el.dob.date.split('T')[0],
            email: el.email,
            location: `${el.location.street.number}, ${el.location.street.name}, ${el.location.city}, ${el.location.state}, ${el.location.postcode}, ${el.location.country}`,
            phone: el.phone,
            picture: el.picture.thumbnail,
        }))
    } catch (err) {
        console.log('err', err)
    }
}
const requestUsersData = async () => {
    try {
        const response = await userService.getUsers();
        users.value = formatData(response?.results)
        console.log('users', users.value)
    } catch (err) {
        console.log('error', err)
    }
}


onBeforeMount(() => {
    requestUsersData()
})

</script>

<template>
    <div class="container">
        <TableComponent v-if="users?.length" :data="users">
            <template #row="{ item }">
                <tr>
                    <td v-for="key in Object.keys(item)">
                        <span v-if="key === 'picture'"><img :src="item.picture" alt="User Thumbnail"></span>
                        <span v-else>{{ item[key] }}</span>
                    </td>
                </tr>
            </template>
        </TableComponent>
    </div>
</template>

