<template>
    <div>
        <button @click="Login">登陆</button>
    </div>
</template>

<script setup>
import { login } from '../../http/LoginAndRegister'
const Login = () => {
    const res = login({
        "email": "2579199806@qq.com",
        "password": "123456789"
    })
    res.then(result => {
        console.log(result);
    }).catch(err => {
        console.log(err);
    })
}


</script>

<style lang="scss" scoped></style>