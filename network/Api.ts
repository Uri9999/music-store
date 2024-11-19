import Auth from './repositories/Auth';
import RequestTab from './repositories/RequestTab';
import Selection from './repositories/Selection';
import Tab from './repositories/Tab';

const Api = {
    auth: Auth(),
    tab: Tab(),
    selection: Selection(),
    requestTab: RequestTab()
};

export default Api;
