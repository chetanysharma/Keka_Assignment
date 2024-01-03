import { commonServiceAPI } from '@/config/axiosInstances';


export default {

  async getUsers() {
    return await commonServiceAPI().get('/?results=50').then((res) => res.data);;
  }

}


