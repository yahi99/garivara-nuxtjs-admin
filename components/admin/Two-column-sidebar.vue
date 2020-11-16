<script>
export default {
    data() {
        return {
            activetab: 1,
        };
    },
    mounted: function () {
        this._activateMenuDropdown();
        this.$router.afterEach((routeTo, routeFrom) => {
            this._activateMenuDropdown();
        });
    },
    methods: {
        /**
         * Returns true or false if given menu item has child or not
         * @param item menuItem
         */
        hasItems(item) {
            return item.subItems !== undefined ? item.subItems.length > 0 : false;
        },

        _activateMenuDropdown() {
            const resetParent = (el) => {
                el.classList.remove("active");
                var parent = el.parentElement;
                if (parent) {
                    parent.classList.remove("menuitem-active");
                    const parent2 = parent.parentElement;
                    if (parent2) {
                        const parent3 = parent2.parentElement;
                        if (parent3) {
                            parent3.classList.remove("show");
                            const parent4 = parent3.parentElement;
                            if (parent4) {
                                parent4.classList.remove("menuitem-active");
                            }
                        }
                    }
                }
            };
            var links = document.getElementsByClassName("side-nav-link-ref");
            var matchingMenuItem = null;
            const paths = [];
            for (let i = 0; i < links.length; i++) {
                // reset menu
                resetParent(links[i]);
            }
            for (var i = 0; i < links.length; i++) {
                paths.push(links[i]["pathname"]);
            }
            var itemIndex = paths.indexOf(window.location.pathname);
            if (itemIndex === -1) {
                const strIndex = window.location.pathname.lastIndexOf("/");
                const item = window.location.pathname.substr(0, strIndex).toString();
                matchingMenuItem = links[paths.indexOf(item)];
            } else {
                matchingMenuItem = links[itemIndex];
            }

            if (matchingMenuItem) {
                matchingMenuItem.classList.add("active");
                var parent = matchingMenuItem.parentElement;

                /**
                 * TODO: This is hard coded way of expading/activating parent menu dropdown and working till level 3.
                 * We should come up with non hard coded approach
                 */
                if (parent) {
                    parent.classList.add("menuitem-active");
                    const parent2 = parent.parentElement;
                    if (parent2) {
                        const parent3 = parent2.parentElement;
                        if (parent3) {
                            parent3.classList.add("show");
                            const parent4 = parent3.parentElement;
                            if (parent4) {
                                parent4.classList.add("menuitem-active");
                            }
                        }
                    }
                }
            }
        },
    },
};
</script>

<template>
<!-- ========== Left Sidebar Start ========== -->
<div class="left-side-menu">
    <div class="h-100">
        <div class="sidebar-content">
            <simplebar class="sidebar-icon-menu h-100" data-simplebar>
                <!-- LOGO -->
                <a href="/" class="logo">
                    <span>
                        <img src="~/assets/admin/images/logo-sm.png" alt height="28" />
                    </span>
                </a>
                <nav class="nav flex-column" id="two-col-sidenav-main">
                    <a class="nav-link" href="javascript: void(0);" v-on:click="activetab=1" v-bind:class="[ activetab === 1 ? 'active' : '' ]" data-toggle="tooltip" data-placement="right" title="Dashboard" data-trigger="hover">
                        <i class="ri-dashboard-line"></i>
                    </a>
                    <a class="nav-link" href="javascript: void(0);" v-on:click="activetab=2" v-bind:class="[ activetab === 2 ? 'active' : '' ]" data-toggle="tooltip" data-placement="right" title="Apps" data-trigger="hover">
                        <i class="ri-apps-2-line"></i>
                    </a>
                    <a class="nav-link" v-on:click="activetab=3" v-bind:class="[ activetab === 3 ? 'active' : '' ]" href="javascript: void(0);" data-toggle="tooltip" data-placement="right" title="Pages" data-trigger="hover">
                        <i class="ri-pages-line"></i>
                    </a>
                    <a class="nav-link" v-on:click="activetab=4" v-bind:class="[ activetab === 4 ? 'active' : '' ]" href="javascript: void(0);" data-toggle="tooltip" data-placement="right" title="UI Elements" data-trigger="hover">
                        <i class="ri-pencil-ruler-2-line"></i>
                    </a>
                    <a class="nav-link" v-on:click="activetab=5" v-bind:class="[ activetab === 5 ? 'active' : '' ]" href="javascript: void(0);" data-toggle="tooltip" data-placement="right" title="Components" data-trigger="hover">
                        <i class="ri-stack-line"></i>
                    </a>
                    <nuxt-link class="nav-link" to="/widgets"> <i class="ri-honour-line align-middle"></i></nuxt-link>
                </nav>
            </simplebar>
            <!--- Sidemenu -->
            <div class="sidebar-main-menu">
                <simplebar id="two-col-menu" class="h-100" data-simplebar>
                    <div class="twocolumn-menu-item d-block" id="dashboard" v-if="activetab === 1">
                        <div class="title-box">
                            <h5 class="menu-title">Dashboard</h5>
                        </div>
                    </div>

                    <div class="twocolumn-menu-item d-block" id="apps" v-if="activetab === 2">
                        <h5 class="menu-title">Apps</h5>
                        <ul class="nav flex-column">
                            <li class="nav-item">
                                <nuxt-link class="nav-link side-nav-link-ref" to="/apps/calendar">Calendar</nuxt-link>
                            </li>
                            <li class="nav-item">
                                <nuxt-link class="nav-link side-nav-link-ref" to="/apps/chat">Chat</nuxt-link>
                            </li>

                            <li class="nav-item">
                                <nuxt-link class="nav-link side-nav-link-ref" to="/apps/companies">Companies</nuxt-link>
                            </li>

                            <li class="nav-item">
                                <nuxt-link class="nav-link side-nav-link-ref" to="/apps/file-manager">File Manager</nuxt-link>
                            </li>

                        </ul>
                    </div>
                </simplebar>
            </div>
            <div class="clearfix"></div>
        </div>
        <!-- End Sidebar -->
    </div>
    <!-- Sidebar -left -->
</div>
<!-- Left Sidebar End -->
</template>
