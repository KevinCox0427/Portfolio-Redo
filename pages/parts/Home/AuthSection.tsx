import React, { FunctionComponent, useState } from "react";
import { cacheLocalStorage } from "../../Home";

const AuthSection:FunctionComponent = () => {
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        hash: '',
        salt: ''
    });
    cacheLocalStorage('DreamStateUserRegister', userData, setUserData);

    const [isEngangingField, setIsEngagingField] = useState({
        username: false,
        password: false
    });

    async function encryptPassword() {
        const response = await (await fetch('/encrypt', {
            method: 'POST',
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password: userData.password
            })
        })).json()
        setUserData({...userData,
            hash: response.hash,
            salt: response.salt
        });
    }

    return <div id="authentication" className="Section">
        <h3 className='Title'>In order to have users, you need secure authentication...</h3>
        <p className='Description'>Authentication on the web has given us many of the things we tend to take for granted: ecommerce, cloud storage, social media. I can give you the peace of mind by securely implementing many different methods of authentication, whether it be through an OAuth2 provider like Google, or entirely from stratch. Let's create a user from stratch together:</p>
        <div className='Example'>
            <div className="Register">
                <h4>Register</h4>
                <i className="fa-solid fa-arrow-rotate-left Reset" onClick={() => {
                        setUserData({
                            username: '',
                            password: '',
                            hash: '',
                            salt: ''
                        });
                    }}></i>
                <div className="InputWrapper" style={{
                    borderColor: isEngangingField.username ? 'var(--yellow)' : userData.username ? 'var(--green)' : 'var(--lightRed)'
                }} onMouseOver={() => {setIsEngagingField({...isEngangingField,
                    username: true
                })}} onMouseOut={() => {setIsEngagingField({...isEngangingField,
                    username: false
                })}}>
                    <p>Username:</p>
                    <input value={userData.username} onChange={e => {
                        setUserData({...userData,
                            username: e.target.value
                        });
                    }} onFocus={() => {setIsEngagingField({...isEngangingField,
                        username: true
                    })}} onBlur={() => {setIsEngagingField({...isEngangingField,
                        username: false
                    })}}></input>
                </div>
                <div className="InputWrapper" style={{
                    borderColor: isEngangingField.password ? 'var(--yellow)' : userData.password ? 'var(--green)' : 'var(--lightRed)'
                }} onMouseOver={() => {setIsEngagingField({...isEngangingField,
                    password: true
                })}} onMouseOut={() => {setIsEngagingField({...isEngangingField,
                    password: false
                })}}>
                    <p>Password:</p>
                    <input value={userData.password} onChange={e => {
                        setUserData({...userData,
                            password: e.target.value,
                            hash: '',
                            salt: ''
                        });
                    }} onFocus={() => {setIsEngagingField({...isEngangingField,
                        password: true
                    })}} onBlur={() => {setIsEngagingField({...isEngangingField,
                        password: false
                    })}}></input>
                </div>
                <button className="Submit" onClick={encryptPassword}>Submit</button>
            </div>
            <div className="EncryptionWrapper">
                <h4>Your encrypted password</h4>
                {userData.salt && userData.hash ? <>
                    <p className="EncryptedPassword">{`${userData.salt}:${userData.hash}`}</p>
                    <p className="Disclaimer">Note: This password encryption is type 8, however all password encryption implementions I use are type 9. The main difference is that type 9 is much more computationally expensive to encrypt, and therefore crack. This is also why I haven't used it in this example, because I cannot afford those server costs! For more information, visit <a target='_blank' href="https://media.defense.gov/2022/Feb/17/2002940795/-1/-1/0/CSI_CISCO_PASSWORD_TYPES_BEST_PRACTICES_20220217.PDF">here</a>.</p>
                </> : <></>}
            </div>
        </div>
    </div>
}

export default AuthSection