<script>
  import "carbon-components-svelte/css/all.css";
  import {
    Button,
    Header,
    // HeaderNav,
    // HeaderNavItem,
    // HeaderNavMenu,
    SideNav,
    SideNavItems,
    SideNavMenu,
    SideNavMenuItem,
    SideNavLink,
    SideNavDivider,
    SkipToContent,
    Content,
    // Grid,
    // Row,
    TextInput,
    Column,
    Theme,
    Toggle,
  } from "carbon-components-svelte";
  let isSideNavOpen = true;

  //theme switcher data
  let theme = localStorage.getItem("__carbon-theme") ?? "g10"; //check if get null value set as g10 (light theme)
  let toggled = theme === "g90" ? true : false;
  
  // svelte-spa-router example
  import Router from 'svelte-spa-router'
  import routes from './routes'

  import client from './pb/client'

  let email = "";
  let password = "";

  let isLoggedIn = client.authStore.isValid;

  async function login(){
    await client.collection('_superusers').authWithPassword(email, password).then((val) => {
        isLoggedIn = client.authStore.isValid;
    });
  }

  function logout(){
    client.authStore.clear();
    isLoggedIn = client.authStore.isValid;
  }
</script>

<Theme bind:theme persist persistKey="__carbon-theme" />

<Header company="MedTrace PKM" platformName="v.0.0.1" bind:isSideNavOpen>
  <svelte:fragment slot="skip-to-content">
    <SkipToContent />
  </svelte:fragment>
</Header>

<SideNav bind:isOpen={isSideNavOpen}>
  <SideNavItems>
    <SideNavLink href="#/" text="Home" />
    <SideNavLink href="#/hello/sveltes" text="Say Hi!" />
    <SideNavMenu text="Menu">
      <SideNavMenuItem href="#/wild/card" text="Wild Card" />
      <SideNavMenuItem href="/" text="Link 2" />
      <SideNavMenuItem href="/" text="Link 3" />
    </SideNavMenu>
    <SideNavDivider />
    <SideNavMenuItem>
    <Column noGutterRight=false padding=true>
    <Toggle labelText="Dark Theme" size="sm" on:toggle={(e) => {
		theme = e.detail.toggled ? "g90" : "g10";
		toggled = e.detail.toggled;
	}} bind:toggled />
      
	</Column>
    </SideNavMenuItem>
    <SideNavDivider />
    <SideNavLink text="Buku Manual" />
    
  </SideNavItems>
</SideNav>

<Content>

<TextInput bind:value={email} labelText="email" placeholder="Masukkan email..." />
<TextInput bind:value={password} labelText="password" placeholder="Masukkan password..." />


{#if isLoggedIn}
<Button on:click={logout}>
  Logout
</Button>
{:else}
<Button on:click={login}>
  Login
</Button>
{/if}
  <Router {routes} />
</Content>
