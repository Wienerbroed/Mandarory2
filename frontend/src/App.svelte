<script>
    import Login from './components/Login.svelte';
    import Content from './components/Content.svelte';
    import { Toaster } from "svelte-french-toast";

    let loggedIn = false;

    // Auto login if token exists
    if (localStorage.getItem("accessToken")) {
        loggedIn = true;
    }

    function handleLoginSuccess() {
        loggedIn = true;
    }

    function logout() {
        localStorage.clear();
        loggedIn = false;
    }
</script>

<Toaster />

<header>
    {#if loggedIn}
        <button class="logout" on:click={logout}>Log out</button>
    {/if}
</header>

{#if loggedIn}
    <Content />
{:else}
    <Login on:loginSuccess={handleLoginSuccess} />
{/if}

<style>
header {
    display: flex;
    justify-content: flex-end;
    padding: 10px;
}

.logout {
    background: #d9534f;
    color: white;
    border: none;
    padding: 8px 14px;
    border-radius: 5px;
    cursor: pointer;
}

.logout:hover {
    background: #b52b27;
}
</style>