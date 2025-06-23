// Components
import DashboardPage from './routes/DashboardPage.svelte'
import DataPasienPage from './routes/Pendaftaran/DataPasienPage.svelte'
import PasienDetailPage from './routes/Pendaftaran/PasienDetailPage.svelte'
import Name from './routes/Name.svelte'
import Wild from './routes/Wild.svelte'
import NotFound from './routes/NotFound.svelte'

// Export the route definition object
export default {
    // Exact path
    '/': DashboardPage,

    '/data_pasien': DataPasienPage,
    '/data_pasien/:id': PasienDetailPage,

    // Using named parameters, with last being optional
    '/hello/:first/:last?': Name,

    // Wildcard parameter
    // Included twice to match both `/wild` (and nothing after) and `/wild/*` (with anything after)
    '/wild': Wild,
    '/wild/*': Wild,

    // Catch-all, must be last
    '*': NotFound,
}
