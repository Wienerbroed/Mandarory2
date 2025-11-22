<script>
    import { authFetch } from "../auth.js";
    import toast from "svelte-french-toast";

    let posts = [];
    let text = "";
    let image = "";
    let editingId = null;

    const myId = Number(localStorage.getItem("userId"));

    async function loadPosts() {
        const res = await fetch("http://localhost:5000/api/auth/posts");
        posts = await res.json();
    }

    async function createPost() {
        const res = await authFetch("http://localhost:5000/api/auth/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text, image })
        });

        const data = await res.json();

        if (data.success) {
            toast.success("Post created!");
            text = "";
            image = "";
            loadPosts();
        }
    }

    function startEdit(post) {
        editingId = post.id;
        text = post.text;
        image = post.image;
    }

    async function saveEdit() {
        const res = await authFetch(`http://localhost:5000/api/auth/posts/${editingId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text, image })
        });

        const data = await res.json();

        if (data.success) {
            toast.success("Post updated!");
            editingId = null;
            text = "";
            image = "";
            loadPosts();
        }
    }

    async function deletePost(id) {
        if (!confirm("Delete this post?")) return;

        const res = await authFetch(`http://localhost:5000/api/auth/posts/${id}`, {
            method: "DELETE"
        });

        const data = await res.json();

        if (data.success) {
            toast.success("Post deleted!");
            loadPosts();
        }
    }

    loadPosts();
</script>

<main>
    <h1>Posts</h1>

    <h2>{editingId ? "Edit Post" : "New Post"}</h2>

    <input placeholder="Write something..." bind:value={text} />
    <input placeholder="Image URL (optional)" bind:value={image} />

    {#if editingId}
        <button on:click={saveEdit}>Save</button>
    {:else}
        <button on:click={createPost}>Post</button>
    {/if}

    <hr />

    {#each posts as post}
        <div class="post">
            <p><strong>{post.email}</strong></p>
            <p>{post.text}</p>

            {#if post.image}
                <img src={post.image} alt="Post image" width="250" />
            {/if}

            {#if Number(post.userId) === myId}
                <button class="edit" on:click={() => startEdit(post)}>Edit</button>
                <button class="delete" on:click={() => deletePost(post.id)}>Delete</button>
            {/if}
        </div>
    {/each}
</main>

<style>
main {
    max-width: 600px;
    margin: auto;
    padding: 20px;
}

.post {
    border: 1px solid #ccc;
    padding: 12px;
    margin-bottom: 12px;
    border-radius: 8px;
}

.edit {
    background: #ffc107;
    border: none;
    padding: 6px;
    margin-right: 8px;
}

.delete {
    background: #dc3545;
    border: none;
    padding: 6px;
    color: white;
}

img {
    margin-top: 10px;
    border-radius: 8px;
}
</style>
