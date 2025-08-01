
const client_base_url = process.env.NEXT_PUBLIC_BASE_URL!
const server_base_url = process.env.BASE_URL!
export const create_account_endpoint = `${client_base_url}/api/create-account`
export const create_account_endpoints =  `${server_base_url}`
export const campaign_success_endpoint = `${server_base_url}/api/campaign/id`
export const campaign = `${server_base_url}/api/campaign`