import Auth from './repositories/Auth';
import Cart from './repositories/Cart';
import Order from './repositories/Order';
import RequestTab from './repositories/RequestTab';
import Selection from './repositories/Selection';
import Tab from './repositories/Tab';

const Api = {
    auth: Auth(),
    tab: Tab(),
    selection: Selection(),
    requestTab: RequestTab(),
    cart: Cart(),
    order: Order()
};

export default Api;
