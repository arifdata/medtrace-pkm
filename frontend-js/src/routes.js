// Route Dashboard
import DashboardPage from './routes/DashboardPage.svelte'

// Route Pendaftaran
import DataPasienPage from './routes/pendaftaran/DataPasienPage.svelte'
import PasienDetailPage from './routes/pendaftaran/PasienDetailPage.svelte'
import TambahPasienPage from './routes/pendaftaran/TambahPasienPage.svelte'

// Route Farmasi
import MasterBMHP from './routes/farmasi/MasterBMHP.svelte'

// Example routes
import Name from './routes/Name.svelte'
import Wild from './routes/Wild.svelte'
import NotFound from './routes/NotFound.svelte'

// Export the route definition object
export default {
    // Exact path
    '/': DashboardPage,

    '/data_pasien': DataPasienPage,
    '/data_pasien/detail/:id': PasienDetailPage,
    '/data_pasien/tambah': TambahPasienPage,

    '/farmasi/master_bmhp': MasterBMHP,

    // Using named parameters, with last being optional
    '/hello/:first/:last?': Name,

    // Wildcard parameter
    // Included twice to match both `/wild` (and nothing after) and `/wild/*` (with anything after)
    '/wild': Wild,
    '/wild/*': Wild,

    // Catch-all, must be last
    '*': NotFound,
}
