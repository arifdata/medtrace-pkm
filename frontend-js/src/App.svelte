<script>
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'
  import '@picocss/pico'
  import Router from 'svelte-spa-router'
  import routes from './routes'

  import Sun from './lib/svg/sun-material.svelte'
  import Moon from './lib/svg/moon-material.svelte'
</script>

<main class="container">

<nav>
  <ul>
    <li><strong>MedTrace PKM</strong></li>
    <li><a style="text-decoration:none" href="/">Home</a></li>
    <li><button class="contrast"><Moon /></button></li>
  </ul>
			
  <ul>
    <li><a href="#">About</a></li>
	<li><a href="#">Products</a></li>
	<li><a href="#">Products2</a></li>
  </ul>
</nav>

</main>
