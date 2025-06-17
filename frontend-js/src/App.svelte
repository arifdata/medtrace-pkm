<script>
  import "carbon-components-svelte/css/all.css";
  import {
    Button,
    Header,
    Modal,
    HeaderUtilities,
    HeaderGlobalAction,
    SideNav,
    SideNavItems,
    SideNavMenu,
    SideNavMenuItem,
    SideNavLink,
    SideNavDivider,
    SkipToContent,
    Content,
    TextInput,
    PasswordInput,
    Theme,
  } from "carbon-components-svelte";
  let isSideNavOpen = true;

  //theme switcher data
  let theme = localStorage.getItem("__carbon-theme") ?? "g10"; //check if get null value set as g10 (light theme)
  let lightMode = theme === "g10" ? true : false;

  // svelte-spa-router example
  import Router from "svelte-spa-router";
  import routes from "./routes";

  import client from "./pb/client";

  let email = localStorage.getItem("__tmp-email") ?? "";
  let password = localStorage.getItem("__tmp-password") ?? "";

  let isLoggedIn = client.authStore.isValid;
  let open = false;

  async function login() {
	try {
	await client
      .collection("_superusers")
      .authWithPassword(email, password)
      .then(() => {
		alert("Berhasil Log in");
        isLoggedIn = client.authStore.isValid;
      });
	} catch (e) {
	  alert(e);
	}
  }

  function logout() {
    client.authStore.clear();
    isLoggedIn = client.authStore.isValid;
  }

  // some icons
  import { Sun, Moon, Logout, Login, UserAvatarFilledAlt } from "carbon-icons-svelte";
</script>

<Theme bind:theme persist persistKey="__carbon-theme" />

<Header company="MedTrace PKM" platformName="v.0.0.1" bind:isSideNavOpen>
  <svelte:fragment slot="skip-to-content">
    <SkipToContent />
  </svelte:fragment>
  <HeaderUtilities>
    {#if lightMode}
      <!-- light mode button -->
      <HeaderGlobalAction
        iconDescription="Mode Gelap"
        tooltipAlignment="end"
        icon={Moon}
        on:click={() => {
          lightMode = false;
          theme = lightMode ? "g10" : "g90";
        }}
      />
    {:else}
      <!-- light mode button -->
      <HeaderGlobalAction
        iconDescription="Mode Terang"
        tooltipAlignment="end"
        icon={Sun}
        on:click={() => {
          lightMode = true;
          theme = lightMode ? "g10" : "g90";
        }}
      />
    {/if}

    {#if isLoggedIn}
      <HeaderGlobalAction
        iconDescription={client.authStore.model.email}
        tooltipAlignment="end"
        icon={UserAvatarFilledAlt}
      />
      <HeaderGlobalAction
        iconDescription="Log out"
        tooltipAlignment="end"
        icon={Logout}
        on:click={() => {
          logout();
        }}
      />
    {:else}
      <HeaderGlobalAction
        iconDescription="Log in"
        tooltipAlignment="end"
        icon={Login}
        on:click={() => {
          open = true;
        }}
      />
    {/if}
  </HeaderUtilities>
</Header>

<Modal
  bind:open
  modalHeading="Login"
  primaryButtonText="Log in"
  secondaryButtonText="Batal"
  on:click:button--secondary={() => (open = false)}
  on:open
  on:close
  on:submit={() => {
    login();
    open = false;
    localStorage.setItem("__tmp-email", email);
    localStorage.setItem("__tmp-password", password);
  }}
>
  <TextInput
    bind:value={email}
    labelText="Email"
    placeholder="masukkan email..."
  />
  <PasswordInput
    bind:value={password}
    labelText="Password"
    placeholder="masukkan password..."
  />
</Modal>

<SideNav bind:isOpen={isSideNavOpen}>
  <SideNavItems>
  {#if isLoggedIn}
    <SideNavLink href="#/" text="Home" />
    <SideNavLink href="#/hello/sveltes" text="Say Hi!" />
    <SideNavMenu text="Menu">
      <SideNavMenuItem href="#/wild/card" text="Wild Card" />
      <SideNavMenuItem href="/" text="Link 2" />
      <SideNavMenuItem href="/" text="Link 3" />
    </SideNavMenu>
  {:else}
<SideNavLink text="Login untuk akses menu" />
  {/if}
    <SideNavDivider />
    <SideNavLink text="Buku Panduan" />
  </SideNavItems>
</SideNav>

<Content>
  <Router {routes} />
</Content>
