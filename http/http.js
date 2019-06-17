import axios from 'axios'
import {Indicator, Toast} from 'mint-ui'
import qs from 'qs'

class Http{

    constructor(){
        this.domain = "http://localhost:8080";
    }

    require(options){
        if(!options.api) throw new Error('api is required.');
        if(!options.param){
            options.param ={};
        }
        if(!options.methods){
            if(options.api.toUpperCase().indexOf("GET")==-1){
                options.method = "POST";
            }else{
                options.method = "GET";
            }
        }

        if (options.loadingVisible) {
            Indicator.open({
                text:options.loadingText
            })
        }
        return new Promise((resolve, reject) =>{
            if(options.methods ==='GET'){
                return axios({
                    method:options.method,
                    url:options.api,
                    baseURL: this.domain,
                    params: options.param
                }).then(response=>{
                    Indicator.close();
                    if(response && response.data.result === 'success'){
                        return resolve(response.data)
                    }else{
                        Toast({message:response.data.message, position:'center'})

                    }
                }, error=>{
                    Indicator.close();
                    Toast({message:response.data.message, position:'center'})
                    return reject();
                }) 
            } else{
                return axios({
                    method:options.method,
                    url:options.api,
                    baseURL: this.domain,
                    params: qs.stringify(options.param)
                }).then(response=>{
                    Indicator.close();
                    if(response && response.data.result === 'success'){
                        return resolve(response.data)
                    }else{
                        Toast({message:response.data.message, position:'center'})

                    }
                }, error=>{
                    Indicator.close();
                    Toast({message:response.data.message, position:'center'})
                    return reject();
                }) 
            }
        })
    }



}

let instance = null;
function getHttpInstance(){
    if (instance) {
        return instance;
    }else{
        instance = new Http();
        return instance;
    }
}

export default getHttpInstance