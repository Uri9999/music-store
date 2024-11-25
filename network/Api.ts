import Auth from './repositories/Auth';
import Cart from './repositories/Cart';
import Category from './repositories/Category';
import Order from './repositories/Order';
import RequestTab from './repositories/RequestTab';
import Selection from './repositories/Selection';
import Tab from './repositories/Tab';
import User from './repositories/User';

const Api = {
    auth: Auth(),
    tab: Tab(),
    selection: Selection(),
    requestTab: RequestTab(),
    cart: Cart(),
    order: Order(),
    user: User(),
    category: Category(),
};

export default Api;
