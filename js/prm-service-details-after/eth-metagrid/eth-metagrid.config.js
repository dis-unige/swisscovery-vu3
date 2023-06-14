export const ethMetagridConfig = function(){
    return {
        // whitelist of providers whose links should be displayed.
        // The array contains the slug of the provider.
        // https://api.metagrid.ch/providers.json
        // if you add a slug, you have also to add the labels (providers.json: 'short_description').
        // You can either define a whitelist (only display items on the list) or a blacklist (display all items except those on the list).
        // If both are defined, only the whitelist will be used. If neither are defined, all metagrid links will be displayed.
        blacklist:
            ["viaf", "sudoc", "gnd", "histhub", "loc"],
        label: {
            'hallernet': {
                de: 'Editions- und Forschungsplattform hallerNet',
                en: 'Editions- und Forschungsplattform hallerNet',
                fr: 'Editions- und Forschungsplattform hallerNet',
                it: 'Editions- und Forschungsplattform hallerNet'
            },
            'fotostiftung': {
                de: 'Fotostiftung Schweiz',
                en: 'Fotostiftung Schweiz',
                fr: 'Fotostiftung Schweiz',
                it: 'Fotostiftung Schweiz'
            },
            'sikart': {
                de: 'SIKART',
                en: 'SIKART',
                fr: 'SIKART',
                it: 'SIKART'
            },
            'elites-suisses-au-xxe-siecle': {
                de: 'Schweizerische Eliten im 20. Jahrhundert',
                en: 'Swiss elites database',
                fr: 'Elites suisses au XXe siècle',
                it: 'Elites suisses au XXe siècle'
            },
            'bsg': {
                de: 'Bibliographie der Schweizergeschichte',
                en: 'Bibliography on Swiss History',
                fr: 'Bibliographie de l\'histoire suisse',
                it: 'Bibliografia della storia svizzera'

            },
            'dodis': {
                de: 'Diplomatische Dokumente der Schweiz',
                en: 'Diplomatic Documents of Switzerland',
                fr: 'Documents diplomatiques suisses',
                it: 'Documenti diplomatici svizzeri'
            },
            'helveticat': {
                de: 'Helveticat',
                en: 'Helveticat',
                fr: 'Helveticat',
                it: 'Helveticat'
            },
            'hls-dhs-dss': {
                de: 'Historisches Lexikon der Schweiz',
                en: 'Historical Dictionary of Switzerland',
                fr: 'Dictionnaire historique de la Suisse',
                it: 'Dizionario storico della Svizzera'
            },
            'histoirerurale': {
                de: 'Archiv für Agrargeschichte',
                en: 'Archives of rural history',
                fr: 'Archives de l\'histoire rurale',
                it: 'Archivio della storia rurale'
            },
            'lonsea': {
                de: 'Lonsea',
                en: 'Lonsea',
                fr: 'Lonsea',
                it: 'Lonsea'
            },
            'ssrq': {
                de: 'Sammlung Schweizerischer Rechtsquellen',
                en: 'Collection of Swiss Law Sources',
                fr: 'Collection des sources du droit suisse',
                it: 'Collana Fonti del diritto svizzero'
            },
            'alfred-escher': {
                de: 'Alfred Escher-Briefedition',
                en: 'Alfred Escher letters edition',
                fr: 'Edition des lettres Alfred Escher',
                it: 'Edizione lettere Alfred Escher'
            },
            'geschichtedersozialensicherheit': {
                de: 'Geschichte der sozialen Sicherheit',
                en: 'Geschichte der sozialen Sicherheit',
                fr: 'Histoire de la sécurité sociale',
                it: 'Storia della sicurezza sociale'
            }
        }
    }
}
