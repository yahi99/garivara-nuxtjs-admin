<script>
/**
 * Auth-layout
 */
export default {
    data() {
        return {

        }
    },
}
</script>

<template>
<div>
    <div class="account-pages mt-5 mb-5">
        <div class="container">
            <Nuxt />
        </div>
        <!-- end container -->
    </div>
    <!-- end page -->
    <footer class="footer footer-alt">
        {{new Date().getFullYear()}} &copy; Design & Developed by <a href="https://andit.co">And IT</a>
    </footer>
</div>
</template>
