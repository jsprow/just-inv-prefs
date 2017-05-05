import axios from 'axios'

export default function sendPrefs(prefArr, mobile) {
    const guid = '{9C5E8465-A0AC-40CB-8F70-884A16A22235}',
        keyword = 'psTest',
        shortcode = '55678'

    var prefs = [],
        url = 'http://client.texnrewards.net/gateway/contactmanager_keyword.asp?user_guid=' + guid + '&keyword=' + keyword + '&shortcode=' + shortcode + '&mobile=' + mobile + '&custom1='

    prefs = prefArr

    var message = []

    for (var i = 0; i < prefs.length; i++) {
        message[i] = "{make:" + prefs[i].make + ",model:" + prefs[i].model + ",year:" + prefs[i].year + "}"
    }

    console.log(url + message)
    axios.post(url + message)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
}