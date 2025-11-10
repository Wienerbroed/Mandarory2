<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    let email = '';
    let password = '';
    let message = '';

    async function login() {
        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            if (data.success) {
                dispatch('loginSuccess');
            } else {
                message = data.error || data.message;
            }
        } catch (err) {
            message = 'Unable to connect to server.';
        }
    }
</script>

<main>
    <h1>Login</h1>
    <input type="email" placeholder="email@email.com" bind:value={email} />
    <input type="password" placeholder="Password" bind:value={password} />
    <button on:click={login}>Login</button>
    
    {#if message}
        <p>{message}</p>
    {/if}
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        width: 300px;
        max-width: 500px;
        margin: 0 auto;
        font-family: 'Times New Roman', Times, serif;
    }

    input {
        margin-bottom: 10px;
        padding: 8px;
    }

    button {
        padding: 8px;
        cursor: pointer;
    }

    p {
        margin-top: 10px;
        font-weight: bold;
    }
</style>
