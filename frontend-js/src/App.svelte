<script>
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'
  import '@picocss/pico'
  import Router from 'svelte-spa-router'
  import routes from './routes'
</script>

<nav>
  <ul>
    <li><strong>Acme Corp</strong></li>
  </ul>
  <ul>
    <li><a href="#/">Home</a></li>
    <li><a href="#/hello/svelte">Say hi!</a></li>
    <li><a href="#/wild/card">Wildcard route</a></li>
    <li><a href="#/does/not/exist">Not found</a></li>
  </ul>
</nav>

<!-- Show the router -->
<Router {routes} />

<main>
  
  <div>
    <a href="https://vite.dev" target="_blank" rel="noreferrer">
      <img src={viteLogo} class="logo" alt="Vite Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>
  <h1>Vite + Svelte</h1>

  <div class="card">
    <Counter />
  </div>

  <p>
    Check out <a href="https://github.com/sveltejs/kit#readme" target="_blank" rel="noreferrer">SvelteKit</a>, the official Svelte app framework powered by Vite!
  </p>

  <p class="read-the-docs">
    Click on the Vite and Svelte logos to learn more
  </p>
</main>

<fieldset>
  <label>
    <input name="2fa" type="checkbox" role="switch" aria-invalid="false" />
    Pico CSS Test 1
  </label>
  <label>
    <input name="subscription" type="checkbox" role="switch" aria-invalid="true" />
    Pico CSS Test 2
  </label>
</fieldset>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
