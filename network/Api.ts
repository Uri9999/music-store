import Article from './repositories/Article';
import Auth from './repositories/Auth';
import Banner from './repositories/Banner';
import Cart from './repositories/Cart';
import Category from './repositories/Category';
import Media from './repositories/Media';
import Order from './repositories/Order';
import RequestTab from './repositories/RequestTab';
import Revenue from './repositories/Revenue';
import Selection from './repositories/Selection';
import Tab from './repositories/Tab';
import User from './repositories/User';
import UserSubscription from './repositories/UserSubscription';

const Api = {
    auth: Auth(),
    tab: Tab(),
    selection: Selection(),
    requestTab: RequestTab(),
    cart: Cart(),
    order: Order(),
    user: User(),
    category: Category(),
    banner: Banner(),
    article: Article(),
    media: Media(),
    userSubscription: UserSubscription(),
    revenue: Revenue(),
};

export default Api;
