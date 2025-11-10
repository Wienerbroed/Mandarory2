<script>
    import Login from './components/Login.svelte';
    import Content from './components/Content.svelte';

    let loggedIn = false;

    function handleLoginSuccess() {
        loggedIn = true;
    }
</script>

{#if loggedIn}
    <Content />
{:else}
    <Login on:loginSuccess={handleLoginSuccess} />
{/if}
