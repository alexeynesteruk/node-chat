Vue.component('message', {
    props: ['msg'],
    template: `<div>
                    <div v-if="!msg.locLink"> 
                        <div class="message__title">
                            <h4>{{msg.from}}</h4> 
                            <span>{{msg.formattedTime}}</span> 
                        </div>
                        <div class="body">
                            <p>{{ msg.text }}</p>
                        </div>
                    </div>

                    <div v-if="msg.locLink"> 
                        <div class="message__title">
                            <h4>{{msg.from}}</h4> 
                            <span>{{msg.formattedTime}}</span> 
                        </div>
                        <div class="body">
                            My current <a v-if="msg.locLink" v-bind:href="msg.locLink" target="_blank"> location</a>
                        </div>
                    </div>
                </div>`
})