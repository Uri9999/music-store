import Auth from './repositories/Auth';
import Selection from './repositories/Selection';
import Tab from './repositories/Tab';

const Api = {
    auth: Auth(),
    tab: Tab(),
    selection: Selection()
};

export default Api;
