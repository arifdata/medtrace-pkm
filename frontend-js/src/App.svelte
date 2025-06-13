<script>
  import "carbon-components-svelte/css/all.css";
  import {
    // Button,
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
    // Column,
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
    <Toggle labelText="Dark Mode" size="sm" on:toggle={(e) => {
		theme = e.detail.toggled ? "g90" : "g10";
		toggled = e.detail.toggled;
	}} bind:toggled />
    </SideNavMenuItem>
    <SideNavLink text="Buku Manual" />
    
  </SideNavItems>
</SideNav>

<Content>
  <Router {routes} />
</Content>
