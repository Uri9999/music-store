import Auth from './repositories/Auth';
import Tab from './repositories/Tab';

const Api = {
    auth: Auth(),
    tab: Tab()
};

export default Api;
