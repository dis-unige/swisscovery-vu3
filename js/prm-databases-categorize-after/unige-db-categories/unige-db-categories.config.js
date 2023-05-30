export const unigeDbCategoriesConfig = {
        // List of subject codes present in 960$$a for online encyclopedias (enc), reference works (ore) and dictionaries (dic).
        // Codes are associated with a term in the databases subject domains. Only codes explicitely defined
        // here will be displayed.
        baseurl : 'search?pfilter=rtype,exact,books,AND&tab=41SLSP_UGE_MyInst_CI&search_scope=MyInst_and_CI&mode=advanced&offset=0&query=any,contains,',
        refcode: {
            'Anthropologie': {
                enc: 'ENC_ANT'
            },
            'Biologie': {
                enc: 'ENC_BIO'
            },
            'Français': {
                dic: 'DIC_FRA'
            },
            'Médecine et santé': {
                ore: 'ORE_MED'
            },
            'Sciences économiques': {
                enc: 'ENC_ECO',
                dic: 'DIC_ECO'
            },
            'Sciences sociales': {
                enc: 'ENC_SOC'
            }
        }
}
