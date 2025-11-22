<script>
    import { createEventDispatcher } from 'svelte';
    import toast from 'svelte-french-toast';

    const dispatch = createEventDispatcher();

    let email = "";
    let password = "";
    let message = "";
    let isLogin = true;

    async function login() {
        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (data.success) {
                localStorage.setItem("accessToken", data.accessToken);
                localStorage.setItem("refreshToken", data.refreshToken);
                localStorage.setItem("userId", data.userId);

                toast.success("Login Successful")
                dispatch("loginSuccess");
            } else {
                message = data.error || data.message || "Login failed.";
                toast.error(message);
            }
        } catch (err) {
            message = "Unable to connect to server.";
            toast.error(message);
        }
    }

    async function signUp() {
        try {
            const res = await fetch("http://localhost:5000/api/auth/signUp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (data.success) {
                toast.success("Signup successful! You can now log in.");
                isLogin = true;
            } else {
                message = data.error || data.message || "Signup failed.";
                toast.error(message);
            }
        } catch (err) {
            message = "Unable to connect to server.";
            toast.error(message);
        }
    }
</script>

<main>
    <h1>{isLogin ? "Login" : "Sign Up"}</h1>

    <input type="email" placeholder="email@email.com" bind:value={email} />
    <input type="password" placeholder="Password1!" bind:value={password} />

    {#if isLogin}
        <button on:click={login}>Login</button>
        <p>
            Don't have an account?
            <a href="#" on:click|preventDefault={() => { isLogin = false; message = "" }}>
                Sign up
            </a>
        </p>
    {:else}
        <button on:click={signUp}>Sign Up</button>
        <p>
            Already have an account?
            <a href="#" on:click|preventDefault={() => { isLogin = true; message = "" }}>
                Login
            </a>
        </p>
    {/if}

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
    font-size: 1rem;
}

button {
    padding: 8px;
    cursor: pointer;
    font-size: 1rem;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 4px;
}

button:hover {
    background-color: #0056b3;
}

a {
    color: #007BFF;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

p {
    margin-top: 10px;
    font-weight: bold;
    text-align: center;
}
</style>
