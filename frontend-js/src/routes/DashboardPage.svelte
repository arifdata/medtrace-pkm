<script>
  async function delay(time, val) {
    return new Promise((resolve) => setTimeout(resolve, time, val));
  }

  let x = delay(3000, "Voila");
</script>

<h4>Dashboard</h4>

{#await x}
  Loading... (3 detik)
{:then val}
  {val}
{/await}
