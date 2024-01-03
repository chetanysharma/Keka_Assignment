<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
    data: Array,
})

const users = ref(props.data);
const sortColumn = ref(null);
const sortDirection = ref('desc');

// Computed Property
const sortedUsers = computed(() => {
    if (sortColumn.value) {
        return users.value.slice().sort((a, b) => {
            const aValue = getColumnValue(a[sortColumn.value]);
            const bValue = getColumnValue(b[sortColumn.value]);
            if (sortDirection.value === 'asc') {
                return aValue.localeCompare(bValue);
            } else {
                return bValue.localeCompare(aValue);
            }
        });
    } else {
        return users.value.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()));
    }
})

// methods
const sortTable = (column) => {
    try {
        if (column === 'picture') {
            return 0
        }
        if (sortColumn.value === column) {
            sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
        } else {
            sortColumn.value = column;
            sortDirection.value = 'desc';
        }
    } catch (err) {
        console.log('err', err)
    }
}

const sortIcon = (column) => {
    try {
        if (column === 'picture') {
            return ''
        }
        if (sortColumn.value === column) {
            return sortDirection.value === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down';
        } else {
            return 'fas fa-sort-down';
        }

    } catch (err) {
        console.log('err', err)
    }
}

const getColumnValue = (value) => {
    try {
        if (typeof value === 'number') {
            if (value.split('-')?.length) {
                return value.split('-')[1].toString();
            } else {
                return value.toString();
            }

        } else if (typeof value === 'string') {
            if (value.match(/^\d+/)) {
                return value.match(/^\d+/) ? value.match(/^\d+/)[0] : address.toLowerCase()
            }
            if (value.split('@')?.length) {
                return value.split('@')[0].toLowerCase();
            } else {
                return value.toLowerCase();
            }

        }
        // Add additional logic for other types if needed
        return '';
    } catch (err) {
        console.log('err', err)
    }
}

</script>

<template>
    <div class="container">
        <table>
            <thead>
                <tr>
                    <th v-for="column in Object.keys(users[0])" :key="column">{{ column }} <i @click="sortTable(column)"
                            :class="sortIcon(column)"></i></th>
                </tr>
            </thead>
            <tbody v-if="users && users.length">
                <template v-for="user in sortedUsers" :key="user.id">
                    <!-- Scoped Slot for <tr> -->
                    <slot name="row" :item="user"></slot>
                </template>
            </tbody>
            <tbody v-else>
                <tr>
                    <td>No Record Found</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

