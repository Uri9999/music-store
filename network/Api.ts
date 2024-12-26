import Article from './repositories/Article';
import Auth from './repositories/Auth';
import Banner from './repositories/Banner';
import Cart from './repositories/Cart';
import Category from './repositories/Category';
import Dashboard from './repositories/Dashboard';
import DeviceToken from './repositories/DeviceToken';
import Media from './repositories/Media';
import Notification from './repositories/Notification';
import Order from './repositories/Order';
import OrderItem from './repositories/OrderItem';
import RequestTab from './repositories/RequestTab';
import Revenue from './repositories/Revenue';
import ReviewTab from './repositories/ReviewTab';
import Selection from './repositories/Selection';
import Subscription from './repositories/Subscription';
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
    dashboard: Dashboard(),
    subscription: Subscription(),
    reviewTab: ReviewTab(),
    deviceToken: DeviceToken(),
    notification: Notification(),
    orderItem: OrderItem(),
};

export default Api;
