import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInfoState {
    email: string;
    phone: string;
    name: string;
    aadhaar:string;
    dob:string;
    password:string;
}

const initialState: UserInfoState = {
    email: '',
    phone: '',
    name: '',
    aadhaar:'',
    dob:'',
    password:'',
};

const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<UserInfoState>) => {
            const { email, phone, name, aadhaar, dob, password} = action.payload;
            state.email = email;
            state.phone = phone;
            state.name = name;
            state.aadhaar = aadhaar;
            state.dob = dob;
            state.password = password;
        },
        clearUserInfo: (state) => {
            state.email = '';
            state.phone = '';
            state.name = '';
            state.aadhaar = '';
            state.password = ''
        }
    }
});

export const { setUserInfo, clearUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;

