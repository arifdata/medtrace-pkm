<script>
  import { successToast, errorToast, infoToast } from "./utils/toast";
  import "carbon-components-svelte/css/all.css";
  import {
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
    InlineNotification,
  } from "carbon-components-svelte";

  //theme switcher data
  let theme = localStorage.getItem("__carbon-theme") ?? "g10"; //check if get null value set as g10 (light theme)
  let lightMode = theme === "g10" ? true : false;

  // svelte-spa-router example
  import Router from "svelte-spa-router";
  import routes from "./routes";

  import { client, isLoggedIn } from "./pb/client";

  let email = localStorage.getItem("__tmp-email") ?? "";
  let password = localStorage.getItem("__tmp-password") ?? "";

  let open = false;

  async function login() {
    try {
      await client
        .collection("_superusers")
        .authWithPassword(email, password)
        .then(() => {
          successToast("Berhasil Login.");
        });
    } catch (e) {
      errorToast("Gagal Login. Cek email & password.");
    }
  }

  function logout() {
    client.authStore.clear();
    infoToast("Berhasil Log out.");
  }

  // some icons
  import {
    Sun,
    Moon,
    Logout,
    Login,
    UserAvatarFilledAlt,
    Locked,
    Notebook,
    Dashboard,
    Add,
    IbmConsultingAdvantageAssistant,
    Medication,
  } from "carbon-icons-svelte";
  let isSideNavOpen = false;
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

    {#if $isLoggedIn}
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
    {#if $isLoggedIn}
      <SideNavLink icon={Dashboard} href="#/" text="Dashboard" />
      <SideNavMenu icon={IbmConsultingAdvantageAssistant} text="Pendaftaran">
        <SideNavMenuItem href="#/data_pasien" text="Data Pasien" />
      </SideNavMenu>
      <SideNavMenu icon={Medication} text="Farmasi">
        <SideNavMenuItem href="#/farmasi/master_bmhp" text="Master BMHP" />
      </SideNavMenu>
    {:else}
      <SideNavLink icon={Locked} text="Akses dikunci" />
    {/if}
    <SideNavDivider />
    <SideNavLink
      icon={Notebook}
      href="https://github.com/arifdata/medtrace-pkm"
      text="Buku Panduan"
    />
  </SideNavItems>
</SideNav>

<Content>
  {#if $isLoggedIn}
    <Router {routes} />
  {:else}
    <InlineNotification
      title="Error:"
      subtitle="Login untuk mengakses lebih lanjut."
      lowContrast
      hideCloseButton
    />
  {/if}
</Content>
