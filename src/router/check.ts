import {redisGet} from '../db/index';
import _ from 'lodash';

const checkProfile = async (userId: number, token: string): Promise<Profile> => {
    if (!userId || !token) {
        throw new Error('请先登陆！');
    }
    const sessionToken: string = await redisGet(userId);
    if (sessionToken !== token) {
        throw new Error('登陆信息已过期，请重新登陆！');
    }
    const profile = (await redisGet(sessionToken)) as Profile;
    if (!profile) {
        throw new Error('请先登陆！');
    }
    return profile;
};

export default checkProfile;
