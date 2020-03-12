<template>
<div>
    <v-container>
        <v-card style="margin-bottem: 20px">
            
            <v-container>
                <v-subheader>프로필</v-subheader>
            
            <v-form>
                <v-text-field label="닉네임" required></v-text-field>
                <v-btn color="blue" type="submit">수정</v-btn>
            </v-form> 
            </v-container>
        </v-card>
        
        <v-card style="margin-bottom: 20px">
            <v-container>
                <v-subheader>팔로잉</v-subheader>
                <follow-list />
            </v-container>
        </v-card>
        <v-card style="margin-bottom: 20px">
            <v-container>
                <v-subheader>팔로워</v-subheader>
            </v-container>          
        </v-card>
    </v-container>
</div>
</template>

<script>
import FollowList from '~/components/FollowList';
export default {
    components: {
        FollowList,
    },

    //nuxt가 편의를 위해서 넣어둔 옵션  (layout, head)
    
    head(){
        return {
            title: '프로필'
        }
    },

    data() {
        return {
            name: 'Nuxt.js',
        }
    }

}
</script>

<style>

</style>