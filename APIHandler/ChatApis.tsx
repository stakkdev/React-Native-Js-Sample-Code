
import { Alert } from "react-native";
import RequestManager from "../../APIManager";
import api from "../../Constants/API";
import { ChatPlansModl, TrainerModl } from "../../Modals/ChatModl";

//-------------------------------------------------------------------
//-------------------------------------------------------------------
//Fetching Trainers List
export async function getTariners(params: any, token: any) {
    return await new Promise(async function (resolve) {
        let header = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
        await RequestManager.postRequest(api.POST_GET_DATA, params, header)
            .then(async function (response: any) {
                let data = await setTrainersData(response.success)
                resolve(data);
            })
            .catch(function (e: any) {
                Alert.alert(e.error);
            });
        resolve;
    });
}

//Trainers Data
export async function setTrainersData(response: any) {
    return await new Promise(function (resolve) {
        let trainersArr: TrainerModl[] = [] as TrainerModl[];
        for (let i = 0; i < response.length; i++) {
            let data = response[i];
            let plan: TrainerModl = {
                description: data.description,
                id: data.id,
                image: data.image,
                tag: data.tag,
                title: data.title,
                phone_number: data.phone_number
            };
            trainersArr.push(plan);
        }
        resolve(trainersArr);
    });
}

//-------------------------------------------------------------------
//-------------------------------------------------------------------
//Fetching Trainers List
export async function getTarinerData(params: any, token: any) {
    return await new Promise(async function (resolve) {
        let header = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
        await RequestManager.postRequest(api.POST_GET_DATA_BY_ID, params, header)
            .then(async function (response: any) {
                let data = await setTrainerData(response.success)
                resolve(data);
            })
            .catch(function (e: any) {
                Alert.alert(e.error);
            });
        resolve;
    });
}

//Trainers Data
export async function setTrainerData(response: any) {
    return await new Promise(function (resolve) {
        let trainer: TrainerModl = {
            description: response.description,
            id: response.id,
            image: response.image,
            tag: response.tag,
            title: response.title,
            phone_number: response.phone_number
        };
        resolve(trainer);
    });
}

//-------------------------------------------------------------------
//-------------------------------------------------------------------
//Fetching Trainers List
export async function getChatPlans(params: any, token: any) {
    return await new Promise(async function (resolve) {
        let header = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
        await RequestManager.postRequest(api.POST_GET_DATA, params, header)
            .then(async function (response: any) {
                let data = await setPlansData(response.success)
                resolve(data);
            })
            .catch(function (e: any) {
                Alert.alert(e.error);
            });
        resolve;
    });
}

//Trainers Data
export async function setPlansData(response: any) {
    return await new Promise(function (resolve) {
        let plans: ChatPlansModl[] = [];
        for (let i = 0; i < response.length; i++) {
            const element = response[i];
            let plan: ChatPlansModl = {
                id: element.id,
                image: element.image,
                title: element.title,
                about: element.about,
                price: element.price,
                isSelected: false,
                color: element.title == 'Silver Plan' ? '#DADADA' : element.title == 'Gold Plan' ? '#FED34B' : '#E30513',
                titleColor: element.title == 'Silver Plan' ? '#414141' : 'white'

            };
            plans.push(plan);
        }

        resolve(plans);
    });
}
//-------------------------------------------------------------------
//-------------------------------------------------------------------
//Fetching Trainers List
export async function getChatPlanDtls(params: any, token: any) {
    return await new Promise(async function (resolve) {
        let header = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
        await RequestManager.postRequest(api.POST_GET_DATA_BY_ID, params, header)
            .then(async function (response: any) {
                let data = await setPlanDtls(response.success)
                resolve(data);
            })
            .catch(function (e: any) {
                Alert.alert(e.error);
            });
        resolve;
    });
}

//Trainers Data
export async function setPlanDtls(response: any) {
    return await new Promise(function (resolve) {
        let plan: ChatPlansModl = {
            id: response.id,
            image: response.image,
            title: response.title,
            about: response.about,
            price: response.price,
            isSelected: false,
            color: response.title == 'Silver Plan' ? '#DADADA' : response.title == 'Gold Plan' ? '#FED34B' : '#E30513',
            titleColor: response.title == 'Silver Plan' ? '#414141' : 'white'
        };
        resolve(plan);
    });
}
