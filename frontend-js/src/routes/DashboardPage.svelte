<script>
  import { data, test } from '../store/sumber-store.ts'
</script>
  
<h4>Dashboard</h4>

{$data.value.sumber}

<button
  on:click={async () => {
    data.set({value: await test()});
  }}>Coba</button
>
