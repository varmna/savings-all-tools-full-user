// ==UserScript==
// @name         Combined Floating Bar - Calculator, ID Matcher, Bulk Calculator & Response Generator
// @namespace    http://tampermonkey.net/
// @version      3.0
// @description  Combined floating bar with calculator, SNS Business ID lookup, bulk savings calculator, and response generator
// @author       varma
// @match        https://gamma.console.harmony.a2z.com/savings-agent-simulator/
// @match        https://gamma.console.harmony.a2z.com/savings-agent-simulator/?page=dashboard
// @match        https://gamma.console.harmony.a2z.com/savings-agent-simulator/?page=dashboard*
// @match        https://beta.console.harmony.a2z.com/savings-agent-simulator/
// @match        https://beta.console.harmony.a2z.com/savings-agent-simulator/?page=dashboard
// @match        https://beta.console.harmony.a2z.com/savings-agent-simulator/?page=dashboard*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // SNS Database
    const snsDatabase = {
        'A3K7DCWQ36Q9JA': {
            customers: ['A283AM4QW8TSMC', 'AXGLY8GINNJVY', 'A3VFVXCRKS6KSW', 'A10OOQ768KPN7Q', 'A2PTJ7DW7DMNFR', 'AFB9KNRRVEI90', 'A2Y7OOCTWUL8LE', 'A1S1IATPJM7VAG', 'AR5TI2GCKHYHH', 'A39IV3BJQ351G3', 'A2EEJE8B3170BD', 'A22BKIKN1VYQHK', 'A3L7C7IJB25YGS', 'A1W5PHGNL52NPA', 'A2GCQ43BMTNCOI', 'A2OPJL4ZH0OT1C', 'A2BE3OI3C5B01Z', 'A2J4VMAR3IM6UA', 'A3S4NTMF0T7AHP', 'A1RPWWEEW5KQWL', 'A2UWJFKX8WE5JF', 'A38C2MK0V39TG9', 'AH640L9OQB3SW', 'A1EWN1GI5EM2DS', 'A20Y96QJERI0W1', 'A2J05LNVSL2JWK', 'A2DPVDV0WFBXXL', 'ACWI31SQTOUAA', 'A1FXTLC6D8H8MQ', 'A3GIB141TKRDUN', 'A3OS6QMP19GV1I', 'A3IB4F4FQP0KKD', 'A3MKA2QNRVB9AM', 'AFDB2CW6G87CL', 'A2GRCLSPHKVRSA', 'A1SBIJ89XCIGVH'],
            groups: ['AIEU6BM5IGL4X']

        },
        'A175K1DXFDF5B0': {
            customers: ['AQBGJ4L3GTVQJ', 'A3LJ1F2TPJ70BL', 'A3IG5D5J0KB4N1', 'A47SKZOPTKPIS', 'A1ZZYU6ADMN2P9', 'A3O8LU3PG81L5V', 'A2GWFNN4ENYTGA'],
            groups: ['A2XWN3TFPZG5S1']
        },
        'A3MCNOWIYH0UXQ': {
            customers: ['A3LK362W6EX81R'],
            groups: ['A1A035E703KVKW']
        },
        'A17QER4HSTACN3': {
            customers: ['A21VXAPYP7D5NF'],
            groups: ['AU0NOA7SSZPMM']
        },
        'A2H0USUO4F5GQE': {
            customers: ['A2W17IZZM33X29', 'A13XI9NI349T34', 'A1ZUITT6TSW2M6', 'AGRNXV9DZ1NK4'],
            groups: ['A29K4HMKOA7QX8']
        },
        'A7CST20YFVNOG': {
            customers: ['A3L4S9PBLFFQ1S', 'A1TCAZ71R119H1', 'A14E60YKD1TF5A'],
            groups: ['A14ZCH8IFLWS6W']
        },
        'AANIMABGK1O1E': {
            customers: ['A2ZVXZK4DK9R4T', 'A2IVYBD78UFKC5', 'A1W02EX2UCB8JO'],
            groups: ['A3R0PV7U0H4LII']
        },
        'A1L4B7KJ61VGUN': {
            customers: ['A1HJZBZWLZ35UG'],
            groups: ['A27SX26V08BRBB']
        }
    };

    // MP Database
    const mpDatabase = {
        'A118LCOEHLSEOQ': {
        customers: ['A1BXFOP1UWOG9'],
        groups: ['A1HM64OMBQCOLJ'],
                              industry: 'Business Services'

    },
    'A12BH11DP02HQZ': {
        customers: ['A1AKIHZLF3KQKH', 'A20CHR4SYEVOE9', 'A276940TU2WGJH', 'A30FSNX416LW1N'],
        groups: ['A164OHDV1KIMUU', 'A18G78UDJOAHCM', 'A2ZERCTC4YXFXQ', 'A2ZRTW3NM3NUVC'],
                          industry: 'Healthcare'

    },
    'A141C59QOE2JS4': {
        customers: ['A2PYCHRDSGHS2C'],
        groups: ['A2NCI30EYNERWI'],
                          industry: 'NA'

    },
    'A1466Q0SB7HEJY': {
        customers: ['A12O1AG84XDRLH'],
        groups: ['A1PGZB0S6Y53WJ'],
                       industry: 'Consumer Products & Services'

    },
    'A14B01NQYCO339': {
        customers: ['A1ZMP44RHC8BL1'],
        groups: ['A2DPUBTKSTSLYH'],
                                  industry: 'Healthcare'

    },
    'A14QEK22SXNADY': {
        customers: ['A18IFWD8RQ822R', 'A1Z8IIOY3ZP1LG', 'A2QOGN7DJB1JZ'],
        groups: ['A2FIDEMTJJHDST'],
                                  industry: 'NA'

    },
    'A16CJUDSK2I791': {
        customers: ['A2BU8IZTH9OCZC'],
        groups: ['A3L595O1LDLHFD'],
                                  industry: 'Consumer Products & Services'

    },
    'A19RWPG67HZLYO': {
        customers: ['A2G2RQOH90B32N', 'A3C7E2TH7E8KP6'],
        groups: ['A2DHDC0276D8II', 'A37TM4D77XJRDB'],
                                  industry: 'Retail & Wholesale'

    },
    'A1A3VLYTZUU19S': {
        customers: ['A2LJ49HCYFXKA0', 'A2P93G6YF6EIAI', 'A34VRVEWQSPP4L', 'A3F940HFBKZF0Z'],
        groups: ['A6UE3Z3HMK03W', 'AH6T3QAWD5ZOR'],
                                  industry: 'Business Services'

    },
    'A1AMP5CHOB3KLA': {
        customers: ['A2A2O932SIL06C', 'A2OSM1BB45M665'],
        groups: ['A27G7EYQTTLVK3'],
                                  industry: 'NA'

    },
    'A1AUJFJPTZKLJ9': {
        customers: ['A2ZLSQJEOTPK6O'],
        groups: ['A1A3EKKXN9P5GT'],
                                  industry: 'Education'

    },
    'A1CGWXTZ7DHB6B': {
        customers: ['AFRSY7TAYM6XQ'],
        groups: ['A1AN1C0R9DW7XM'],
                                  industry: 'Government'

    },
    'A1CLU3QDUTI3SW': {
        customers: ['A1DS296QA3V9EO'],
        groups: ['A1OV42YUYGYDS7'],
                                  industry: 'Healthcare'

    },
    'A1IKSWZ7C2Y1N3': {
        customers: ['A35CYFOGHY8DYA'],
        groups: ['A1SDD9AQIU0L4V'],
                                  industry: 'Business Services'

    },
    'A1KV04IFYSYWYX': {
        customers: ['A2VR62C106O3YS'],
        groups: ['A34IPYUTMTLJLE'],
                          industry: 'Retail & Wholesale'

    },
    'A1LFY5KBA4N1UQ': {
        customers: ['A2X15FJ0FEB3XM'],
        groups: ['A17Q2C69NII34J'],
                                  industry: 'Healthcare'

    },
    'A1P58R1U3DZD48': {
        customers: ['A29NZI34Y3J4A', 'A3LXJAHLX3DB3U'],
        groups: ['A2E8D4CHH21Y6T', 'A2SMIVA9OWYALJ'],
                                  industry: 'Business Services'

    },
    'A1PHH5E00BE7Y7': {
        customers: ['A1MEUFM8JVLIES'],
        groups: ['A11QJ5DLOKYFIB'],
                                  industry: 'NA'

    },
    'A1SYQFKQ3E7ZXN': {
        customers: ['A38E6XAMGYB0DN', 'AC5XUU5KR6B61', 'AYK6F16VTWTL0'],
        groups: ['A3HYKHDGD1M6VJ'],
                                  industry: 'NA'

    },
    'A1V1A957P20JDD': {
        customers: ['A1A6YH9T61V96M', 'A2NOB2GMOQ8EMW', 'A33MIQGC5VKHYR', 'A3BMAC7I4JJVQV', 'A3FFXSDDHU0VAR', 'A3VNSOAX3QZNJ9', 'AC2UW6OAJNF80', 'AFAMG2UXWAMX1', 'AVPRIXAISTDDU'],
        groups: ['A149KL8GIIU5XF', 'A1BWDL0FBH5AA0', 'A1G2S866J5OPIZ', 'A1W1WM9OMZF57N', 'A28RZQ1BK8747J', 'A28W1C1CY1HK4K', 'A2B18LY5RYDLIF', 'A2LIWSNCF6IZ7J', 'A2UC1Z81QSFCAV', 'A3AV07WVPW5K9E', 'A3CIDFNVS3DYAY', 'A3KONCNA3O4YPZ', 'A5FNJ18QI2WGD', 'AFZ1IM7XTCW6P', 'AOIJB49ZQUYRX', 'AWLONGMOUB8Z7'],
                                  industry: 'Consumer Products & Services'

    },
    'A1XPJ2APO044J': {
        customers: ['A1MMBXHNB2WP4K', 'A2WKOK6YP0T226', 'A3S36OHEUV5F62', 'A94X1NUR7LIZC', 'AP0DBLYSMC2O2'],
        groups: ['AMFJCO8ES99CQ'],
                                  industry: 'Retail & Wholesale'

    },
    'A1Z6BVBJ8K0JCN': {
        customers: ['A3BN0FRSK3DXPI'],
        groups: ['A1VROPYYDR9ZDZ'],
                                  industry: 'Consumer Products & Services'

    },
    'A21GQVJ8OFAR2I': {
        customers: ['A1AF097ENWSHVD'],
        groups: ['A21QGZJUDGJC5Q'],
                                  industry: 'Non-Profit'

    },
    'A2419JPRAH2FG9': {
        customers: ['A3UFGL1FTOLPFC'],
        groups: ['A1AW2E7BJN5CEB'],
                                  industry: 'Healthcare'

    },
    'A25A0MNZSI7WZH': {
        customers: ['A2Y1HLC53A858K'],
        groups: ['A1OBVQZXMWA7QJ'],
                                          industry: 'Healthcare'

    },
    'A27WZFZPGJ2KGN': {
        customers: ['A26DX8PF32A9WR'],
        groups: ['AMPYHBJSWZLD2'],
                                  industry: 'Consumer Products & Services'

    },
    'A28LG46VYVIS1M': {
        customers: ['AH09I70QG7CLF'],
        groups: ['A2MHVIIFUZBJFV'],
                                  industry: 'NA'

    },
    'A2AZWR5C1SKNIM': {
        customers: ['A3B64PM6HMH9NJ'],
        groups: ['A1YTGUJ4VEKMPT'],
                                          industry: 'Real Estate'

    },
    'A2CZFJ2RKY7SE2': {
        customers: ['A16C8ZW8XP7SJQ', 'A1WIN5M2PWSQZ7', 'A1XT0K1IA9A52S', 'A2RY12QV8NHKC5', 'A2ZSM2QC7X586F', 'A3391W1A4FN79S', 'A3CM7ZRRZXDEHD', 'A3SH6SXPFGZ0U3', 'API6MG3SRT05S'],
        groups: ['A1FDLET16YS4HP', 'A281A0RX4F4DXM', 'A2GZD8OUG3AJVQ', 'A2KLSVBUAFAR44', 'A2OYVYNDDCGYR2', 'A3B5ZM7ZMXZG3V', 'A3DHI56QCPWYNT', 'A3UB1GPDI3ENE5', 'AACVZDW8JC0AM'],
                                          industry: 'NA'

    },
    'A2HF31VBTSXJUU': {
        customers: ['A10S4XUER6EPV6', 'A10ZGVMEDWVE9', 'A123MSITZYU3KD', 'A13JKV1YC12ZW0', 'A14BV0Q6SJNF6', 'A14DZJ8BQ225VI', 'A15Q6VUTW5TOX7', 'A16NUF2E1WSSYN', 'A17W0VESZNUOJA', 'A18XBYYL8B5HOT', 'A1BHAOK82TR78', 'A1BLG6LF17VCAN', 'A1C3Q3VCL0REMS', 'A1EA4J3VJ6QI2O', 'A1EBMTU4350Q6V', 'A1F7Z5L4WMPMTO', 'A1GVSTSR2FK61Z', 'A1HJT3JASNIRPE', 'A1IFDQCHLI5EOT', 'A1KBMAHP66J2B0', 'A1M4YIXGP472VN', 'A1QNS7IB1MNX73', 'A1R6PQ6INOBYER', 'A1V698CG8J51W8', 'A23H4PMK4M6ZQR', 'A2DBBLUYL6YBJ5', 'A2EFW21QT6I1TA', 'A2ERXPMIIMJ3IH', 'A2FRWP7HBFWSQO', 'A2K50L8D3QEFM8', 'A2NO8ELS2U0UG8', 'A2R8TNQU5NGLYP', 'A2RO69ZBAV73OI', 'A2SD4OD70TXK86', 'A2VM7Y0KWBYGTF', 'A2X5J1VR532W7P', 'A2ZLTV02JL4GNL', 'A303HVP241B9C6', 'A31XQJMX28AE1C', 'A31YFWUPJYHLV9', 'A37CDRM5PTBFGM', 'A37LI1RNUJ3FL4', 'A38S8OGS16NXKY', 'A3CN9GOK9ZL0T1', 'A3MVTVLYTBLM2K', 'A3NB9V1ZO0RXGI', 'A3NKN151X038PN', 'A3O9WHR20XJZNL', 'A3Q01W8M2CSC58', 'A3TEM2AA7D9T2F', 'A3U58WW46IEE6C', 'A3UQG6UK90AEIB', 'A50KOXX0XWMDY', 'A58X4NNPF5D8N', 'A5X2U7ED9SRL5', 'A764QZH3JQG3V', 'A7YQ917JMY4HB', 'ABNH10X0LSAHI', 'AFVSGK9PHDMCZ', 'AHMJX3BUPUUB9', 'AL02W4LOQ6SYF', 'ANFENGXB6DW1', 'AOPJW8LKY6HER', 'AP3MITXKFPU8D', 'APG0MJSD24RQG', 'APV4SCWFOLG5C', 'AQ739SCABWA5R', 'AR6EBD9QOE73N', 'AR7GE9NUG8V1', 'ATK4A202MMHE7', 'AWIF5HL2I45A5', 'AWTI4SIIBK5CO', 'AXVZUXI35AVNR'],
        groups: ['A1HK2O4H5PA4WU', 'A2SI0XSNK1XSSS', 'A3EFT020TIF9TN', 'A8ORH3XS9IXDP', 'A9LZ5YWMMGCI3'],
                                          industry: 'NA'

    },
    'A2KJ5ECC4UHJ2Y': {
        customers: ['A25G0OQIV7R4T0', 'APG1FN8DK2BAY', 'AVVQ79E0JSW3I'],
        groups: ['A14JEX2HCEXMIQ', 'A2FW1RL9HDHRRX', 'A32O42SGZOVU5T'],
                                          industry: 'Healthcare'

    },
    'A2LB9SX8ILWL50': {
        customers: ['A3054BRHHTR6FS'],
        groups: ['A24Q4PVXFHEKAW'],
                                          industry: 'Real Estate'

    },
    'A2LP117J17JUPB': {
        customers: ['A2FWZV3928241A'],
        groups: ['A12RNNHCC6JK7R'],
                                          industry: 'Retail & Wholesale'

    },
    'A2N5ZE5PJX0GP5': {
        customers: ['A16WEQLXY0R3YF', 'A1DFQ84FQF762Y'],
        groups: ['A35MFIT7UUTSZB'],
                                          industry: 'Education'

    },
    'A2PD9XRDJ93DSZ': {
        customers: ['A3GB1BQT4P0JZR'],
        groups: ['A7DP371990URX'],
                                          industry: 'Restaurant'

    },
    'A2PEZSEV5DC2PJ': {
        customers: ['APBCAYABU0LWW'],
        groups: ['A28TLE3YGQ13F'],
                                          industry: 'Healthcare'

       },
    'A2PPXKJ8JPBKO9': {
        customers: ['A2W6DM7P9AW5UV'],
        groups: ['AOFFE9XKMUNE1'],
                                          industry: 'NA'

    },
    'A2RAMP7ROI7AKJ': {
        customers: ['AQY5W14NAXFJB'],
        groups: ['A12MI0AAKM78Q'],
                                          industry: 'Healthcare'

    },
    'A2VULPJOHQC0S2': {
        customers: ['AFB7L1SQJAHQC'],
        groups: ['A1W49VLUSCAZLR'],
                                          industry: 'NA'

    },
    'A2X722WEIW3MFN': {
        customers: ['A3L8CD2ZRCRQMN'],
        groups: ['A171FQB0LKW20J'],
                                          industry: 'Business Services'

    },
    'A33S6KR5LCABS9': {
        customers: ['A2L3VNC0X8QV48'],
        groups: ['A34KSIFDQHHHXL'],
                                          industry: 'Consumer Products & Services'

    },
    'A340O3HGIYYN0T': {
        customers: ['A3JAOT1U4XCSP2'],
        groups: ['A34OA99WF4JZK3'],
                                          industry: 'Real Estate'

    },
    'A34SY8GKMC4JS9': {
        customers: ['ASFKYERVSVWR4'],
        groups: ['A307XEV2XJ4SBZ'],
                                                  industry: 'Real Estate'

    },
    'A35H0IQ8NXICJA': {
        customers: ['A2T17STL2XIVC6', 'A3FXZPNY8R3XOI', 'A4YKXPBSD5HS6'],
        groups: ['A1UMFRIPHW1XW5'],
                                                  industry: 'Retail & Wholesale'

    },
    'A35LG6ELLJ5QG': {
        customers: ['A1MXRBCPK516LB', 'A2MBJE9D22D2Y1', 'A3HR9DN75CUI2B'],
        groups: ['A13YY9JFG8HL1T', 'A1KOP7XT6QOOEF', 'APVLH37GP1JN0'],
                                                  industry: 'Healthcare'

    },
    'A3609BB60JH350': {
        customers: ['A1PGGODT1PWXTD', 'A27BOG2ZAAF9K5', 'A28H8RYSZNBM0Y', 'A2FOW8TS42UZS9'],
        groups: ['A1PLZMUVK4LVGU'],
                                                  industry: 'Retail & Wholesale'

    },
    'A36XTKPMASSTIK': {
        customers: ['A292F96NSF0IDA'],
        groups: ['A2E18RVUYJ3W3M'],
                                                  industry: 'Real Estate'

    },
    'A3778QYP3W4G26': {
        customers: ['A6YC0S1TJM661'],
        groups: ['A27PRCPR8Q3NV6'],
                                                  industry: 'Retail & Wholesale'

    },
    'A39QJWRXYA089G': {
        customers: ['A20KM008O6EG4S'],
        groups: ['ABQ6G4XMNXQSC'],
                                                  industry: 'Healthcare'

    },
    'A3CH0YLK252FTA': {
        customers: ['A1P0L8QFEGZ7HN'],
        groups: ['ASABRRCF8K5EQ'],
                                                  industry: 'Non-Profit'

    },
    'A3D3KZQZLI7UQT': {
        customers: ['A2MY62U8TZ7XSS'],
        groups: ['A1MK2ZCLUG9WZT', 'AVL9B2BPAVKYW'],
                                                  industry: 'Retail & Wholesale'

    },
    'A3D5MVMBPAV53J': {
        customers: ['A2EXE4W0P94YVF'],
        groups: ['AY5PH7VR2T64B'],
                          industry: 'NA'

    },
    'A3E4MEQSDBF3GP': {
        customers: ['A28IHEY7M2YMQD'],
        groups: ['A2UBKW16GPUJUQ'],
                          industry: 'NA'

    },
    'A3K7DCWQ36Q9JA': {
        customers: ['A10OOQ768KPN7Q', 'A1EWN1GI5EM2DS', 'A1FXTLC6D8H8MQ', 'A1S1IATPJM7VAG', 'A1SBIJ89XCIGVH', 'A1W5PHGNL52NPA', 'A2BE3OI3C5B01Z', 'A2DPVDV0WFBXXL', 'A2J05LNVSL2JWK', 'A2J4VMAR3IM6UA', 'A2PTJ7DW7DMNFR', 'A2UWJFKX8WE5JF', 'A3GIB141TKRDUN', 'A3IB4F4FQP0KKD', 'A3L7C7IJB25YGS', 'A3OS6QMP19GV1I', 'A3S4NTMF0T7AHP', 'ACWI31SQTOUAA', 'AFB9KNRRVEI90', 'AFDB2CW6G87CL', 'AH640L9OQB3SW', 'AR5TI2GCKHYHH', 'AXGLY8GINNJVY'],
        groups: ['AIEU6BM5IGL4X'],
                          industry: 'Consumer Products & Services'

    },
    'A3KP13RPPN85KI': {
        customers: ['A23VU8JMAMP10H'],
        groups: ['A3DU1GB1VQMY2C'],
                          industry: 'NA'
    },
    'A3LVWDECZ1XIZ6': {
        customers: ['A26QQ5PJJXDN0Z'],
        groups: ['AB1NPG6K3AP5U'],
                          industry: 'Retail & Wholesale'

    },
    'A3MCNOWIYH0UXQ': {
        customers: ['A3LK362W6EX81R'],
        groups: ['A1A035E703KVKW'],
                  industry: 'Education'

    },
    'A3OQ5G8P8648NE': {
        customers: ['A1VJOIEUAQSO63', 'AG8Q1QQ4LRLSU'],
        groups: ['A3JGYEGDM2VYYS'],
                  industry: 'Hospitality & Travel'

    },
    'A3PCRQJD7MU4PF': {
        customers: ['A1VLQ45IY10RXB'],
        groups: ['AOWZ86H6XOZ8P'],
                industry: 'Healthcare'

    },
    'A3Q7A6IWN4IX9P': {
        customers: ['A1DZ0QKNPFI3CG', 'A37L5DFTBMGACW', 'A3L2XUYAS3MSGL', 'A3NA68842FTIB6', 'A3Q5Q3S5WM5QDT', 'ADGQSDDFI7TXF', 'AO4ZDPOQ4HVBH', 'APNSQ3U4JBP9M', 'AVGVXZRR9F9PC', 'AWP2NN3FEZ7EK', 'AY67HK8AHZOME'],
        groups: ['A2UULTR1Q4IAG5', 'ANI4RPK587RLL', 'AU2Y1GZHM9BPR'],
                industry: 'Construction'

    },
    'A3QP7WVT0JQT93': {
        customers: ['A12H79K4T2G770', 'A3Q7615AZCSWG4'],
        groups: ['A2NJNCCKGVF3QN'],
                industry: 'Business Services'

    },
    'A3S188JM378WEJ': {
        customers: ['A1NHMYK2OI64EX', 'A1T3P00BQK0TPN'],
        groups: ['A1LUMICCZE5V10'],
                industry: 'Transportation'

    },
    'A3T4TT2Z381HKD': {
        customers: ['A2V64NK86KXNUD', 'AJM8PSRZ1B43P'],
        groups: ['A3AJCEXTO911D0', 'A3RWHWYV83BKEL'],
                        industry: 'Business Services'

    },
    'A3TXV4NLRBLJS2': {
        customers: ['A12B1FQH8K6YKA'],
        groups: ['A1BV6SOMS3NTFN'],
            industry: 'Healthcare'

    },
    'A3URJEFJ7WSZ5A': {
        customers: ['A2BVNC8Q05KAEU'],
        groups: ['A2FZIXFYCTF1QH'],
               industry: 'Healthcare'

    },
    'A3WANV05R6ZUJ': {
        customers: ['A2H99HTNBBDFZI'],
        groups: ['A3BNM3UQBSP8NG'],
                industry: 'Healthcare'

    },
    'A4ME731YV3D32': {
        customers: ['A3FIZKEG7HKEXB', 'A3S9RR45CYG5KG', 'AWKTPLXYD63V', 'AZDJJZ8CDH8PC'],
        groups: ['ARYBKE0UWD6H3'],
                industry: 'NA'
    },
    'A7CST20YFVNOG': {
        customers: ['A3L4S9PBLFFQ1S'],
        groups: ['A14ZCH8IFLWS6W'],
                industry: 'NA'
    },
    'A7J6RNJ3YHW1K': {
        customers: ['AO0N8XR55TDUX'],
        groups: ['A1YL84U0R1B742'],
                industry: 'NA'

    },
    'A8NXBPEM3UI45': {
        customers: ['A1DJNV4ZNU02PJ'],
        groups: ['AXQEEEPF17X2O'],
                industry: 'Technology'

    },
    'A9Z8NTXNY9CHQ': {
        customers: ['A1M378D0ED3WEO'],
        groups: ['A1MWNKIVNW2XKM'],
                industry: 'NA'

    },
    'AAVTCR59KYQER': {
        customers: ['A3TJH0ZAL48PBG'],
        groups: ['A30271E9FB2Z0W'],
                industry: 'NA'

    },
    'ABCKINK2FTKGX': {
        customers: ['A16M5CVJEVFI6B', 'A2VD84VJ1QEMXT', 'A2WVEFZ9F6FQB3', 'A3M848S1LM501J'],
        groups: ['A1MJV8KVYA0TCR', 'A2I0K8CJJ7TJBO', 'A3I2JMN6QRNX4B', 'A3P288LKE1DKYT'],
                industry: 'NA'

    },
    'ACHKBEG1GG587': {
        customers: ['A2G74HZI8H1WOE'],
        groups: ['A1TOXL4EX0O4SS'],
                industry: 'NA'
    },
    'AI7VEI35GJTI0': {
        customers: ['A1JJ4H3LFSTM4L', 'A23UTYR7A8Y9CH', 'A2YPOGI4GU3NMX', 'A31GWV1FQ1Q2D', 'A3D5K6UQ580AEJ', 'A3JZU3MC0YBXE5', 'A3MWR985FJZCGS', 'ABZNX99AWL8JS', 'AWI64AH3NJX8T'],
        groups: ['AFIPNNTGX2MCF'],
                industry: 'NA'

    },
    'AL2LU44BYBZOT': {
        customers: ['AHU1Y6GVF0I4P'],
        groups: ['A26CA145C1JY71'],
                industry: 'NA'

    },
    'AMCD9WV7RYGK8': {
        customers: ['A1L4QVIXSAKEQZ', 'A2TMKXUNY2AE9T', 'AXN42JCBJU09'],
        groups: ['A2GEDQ1AQD5UWV', 'A89Q7RBTZD2Y8'],
                industry: 'Healthcare'

    },
    'AS4ZFRW2QUV2': {
        customers: ['A27VM1JH1SX2KF', 'AQ9GQCCFCM73J'],
        groups: ['A1YULUK0RYWON5'],
                industry: 'Business Services'

    },
    'ATEKJ6X05M2EB': {
        customers: ['A1R6IOO8F8SYDW', 'A3DWDR5WXZ8063'],
        groups: ['A1L0MR5RK0CJJK'],
                industry: 'Business Services'

    },
    'AV5LS9SCNW31R': {
        customers: ['A19N5ITTVGY62E'],
        groups: ['A1VS5NK6F1HPW2', 'A29Q51M7E4QFEX'],
                industry: 'Technology'

    },
    'AW8OQIJJ2YV4G': {
        customers: ['AH392BK0EL0TP'],
        groups: ['A3TKE0T9QNB35X'],
                industry: 'Consumer Products & Services'

    },
    'AWNV5LV3H61EI': {
        customers: ['A3BHT1MX2QIPQS'],
        groups: ['A3FKC38PTPB4PX'],
                industry: 'Consumer Products & Services'

    },
    'AXUIGTF417T0D': {
        customers: ['A1C0QLMFVEFHY9', 'A1KJPEIJL9JI1Y', 'A1KVOE7192O1Z9', 'A2F1LFG1BR53P8', 'A32WEDB24D2RXI', 'A37W0SG2NTD8K7', 'A3837Q91R6U73X', 'A3BL9HWSMKYDLJ', 'AH1B2DA87RUCY'],
        groups: ['A1DU213JITJZSX', 'A29U1OQJHXG9UU'],
                industry: 'Retail & Wholesale'

    },
    'AYQDGFNSXPOEW': {
        customers: ['A1XXDDTFK2RZQ2'],
        groups: ['AHZLB7H48YTIB'],
                industry: 'Consumer Products & Services'

    },
    'AYZAHGLH9FDBW': {
        customers: ['A381SV152ORNMS'],
        groups: ['A2TWRLHHBAO9AM'],
                industry: 'Transportation'

    },
    'AZRUPP45GZH6P': {
        customers: ['A3VXKWL3QX7PZH'],
        groups: ['A7W0M17OYHKVJ'],
        industry: 'NA'
        }
    };

    // BBQD Database
    const bbqdDatabase = {
        'A118LCOEHLSEOQ': {
        customers: ['A1BXFOP1UWOG9'],
        groups: ['A1HM64OMBQCOLJ', 'A2B5GQ8SDS11NI'] ,
            industry: 'Business Services'
    },
   'A11DQ8XRC80QCD': {
        customers: ['A2LLXRZP5EDQ9Y', 'A371YNB81Y3FB1', 'AVZUH6RTO5VCF'],
        groups: ['AZMTPN85ZHPC4'],
        industry: 'Technology'
    },
    'A13XVLDP09A8OW': {
        customers: ['A3BMGQPMGF8T9I', 'AEBG65WG7DUB8'],
        groups: ['A2JF4Q1HMFZNNS'],
        industry: 'NA'
    },
    'A15710CE0IWWEH': {
        customers: ['A3CDELBKFANDN7'],
        groups: ['A3MNB88WMOLBVG'],
        industry: 'Retail & Wholesale'
    },
    'A17WWFO55L14D3': {
        customers: ['A1AMZ75QR4NCKT'],
        groups: ['A21A4FHY8L7FC'],
        industry: 'Business Services'
    },
    'A19RWPG67HZLYO': {
        customers: ['A2G2RQOH90B32N'],
        groups: ['A2DHDC0276D8II', 'A37TM4D77XJRDB'],
        industry: 'Retail & Wholesale'
    },
    'A1AUJFJPTZKLJ9': {
        customers: ['A2ZLSQJEOTPK6O'],
        groups: ['A1A3EKKXN9P5GT'],
        industry: 'Education'
    },
    'A1D8HT7JTY0SAB': {
        customers: ['A12B5UD19HSND5', 'A137N9D1ZKNIQ0', 'A14YUEX8HWRYLS', 'A15WE3WTXA00LT', 'A1FSZLXO52YEFI', 'A1G27O9GLUL688', 'A1ITJ8N0ACL6IQ', 'A1LM6DU1WEF6DV', 'A1LXJCRS9VT3WC', 'A1Q7OX8RZ32NGT', 'A1REB883D8KXME', 'A1W687W5GWWP8Z', 'A1Y7EGYIP8UW23', 'A1YDC0KD3KI4MC', 'A21FGB1MFGB8GF', 'A24NO3R82BCZG3', 'A28N75YCSNP1NH', 'A2BVID7NSGYL2C', 'A2COAY0CVXZF3S', 'A2F81PC90FK2VB', 'A2FA4Y6J6O602U', 'A2L9S0L57XNZ4R', 'A2MPRHG2AX1YRS', 'A2PHBGG1W6L2T0', 'A2RIRM9MU1ZX8I', 'A2RPYMTMO528I', 'A2XV2ETWQVHIKO', 'A2YJLOANOXVU1J', 'A311JNQESZS160', 'A340119EWS9978', 'A35QQVYM9LOH65', 'A37KQN6J2FEAT1', 'A37Z795ZCGV68R', 'A3D39SZCL1BA71', 'A3DM6MMLFP77BI', 'A3EIKLFZPL1JWR', 'A3FL740T1JWW83', 'A3GEJ5YMECF69G', 'A3GJ0MAIUXX70G', 'A3KNF6O07E0O2R', 'A3KOW9EMOLE607', 'A3LWJUJDUYH3AV', 'A3LXHC8DFAPK7L', 'A3TPV5U4UCYSUM', 'A4JQKDUOLT2QV', 'A5I0AV2EY09W7', 'A845JZA5DOTGM', 'AC4U408S4ICEW', 'AND9D422392LH', 'AREP8AZR5TX5I', 'ASVBT77BAYIHS', 'AYA2NVPTZMRYX', 'AYJKN7CCWIABL'],
        groups: ['A1M2ALMWH01M18', 'A1MHYCLXK3WYFU', 'A1NQ93GW3WL016', 'A272UR96344N42', 'A2I7JRLFZPRD6Q', 'A35KI8PX8EXR6L', 'A3GQS57T8RBW0Q', 'A3KFZ6O9URS42M', 'A69JK9R36ABBE', 'ADRGI221312RR'],
        industry: 'Healthcare'
    },
    'A1IM5JUKGCY0YP': {
        customers: ['ARN4INYRG1YPG'],
        groups: ['A1FX7RLPG56M4'],
        industry: 'NA'
    },
    'A1JZ2BIMVSH330': {
        customers: ['A3MGPHRRP4VHW2'],
        groups: ['AEH8661N5FN5B'],
        industry: 'Business Services'
    },
    'A1K6LPJ49N8IWA': {
        customers: ['A3P4ZU46EKHDU', 'A4R4KLUI8MXET'],
        groups: ['AHDCP7FI7DSCO'],
        industry: 'Retail & Wholesale'
    },
    'A1LFY5KBA4N1UQ': {
        customers: ['A2X15FJ0FEB3XM'],
        groups: ['A17Q2C69NII34J'],
        industry: 'Healthcare'
    },
    'A1LXLY8VLEH6U2': {
        customers: ['A3E70K77IFQRY0'],
        groups: ['A2XFZTU0KOQ74I'],
        industry: 'Consumer Products & Services'
    },
    'A1M2LHLLSARFH8': {
        customers: ['A3I6VQFWCG70OJ', 'AVNK4M1WJB6EI'],
        groups: ['A3SAFRWQRTDOCQ'],
        industry: 'Business Services'
    },
    'A1MMLAHL0U4PT9': {
        customers: ['A2LF0SPXV5T6B3'],
        groups: ['A1VDFMZSGUWA19'],
        industry: 'Business Services'
    },
    'A1P58R1U3DZD48': {
        customers: ['A29NZI34Y3J4A', 'A390Z63L2BVEK7', 'A3LXJAHLX3DB3U'],
        groups: ['A2E8D4CHH21Y6T', 'A2SMIVA9OWYALJ'],
        industry: 'Business Services'
    },
    'A1R9I16PU3SAT2': {
        customers: ['AJKWTNM4HYSWI'],
        groups: ['A4EGATVQ8YT85'],
        industry: 'Retail & Wholesale'
    },
    'A1RI4OZUDVFQJD': {
        customers: ['A2KDBU1W6N16FR', 'A2MSWYZ7QSRBA7', 'AFSZU1DPQB52P'],
        groups: ['A237UMDE1UAM80', 'A39CLJX48WYGUX', 'AIQNC4S04L785'],
        industry: 'NA'
    },
    'A1UPDCYXH7FCJ3': {
        customers: ['A124I8SEP3PRJN', 'A145RI6V7PPCIM'],
        groups: ['A1GI3MO217B0ZR', 'AJX2ZL199ZO7V'],
        industry: 'NA'
    },
    'A1VAPXJGYLB6G1': {
        customers: ['A1A231LN56QRO5', 'A30KM0LBKD9HHF', 'A3BPLL2QJTWORT', 'AL43LFRJDFL91', 'AOVQ8DTW72XU3'],
        groups: ['A1ENBNZ60977HE', 'A1UEAILEU0CEMH', 'A8FYJDP7B38DB'],
        industry: 'NA'
    },
    'A1W3K3Q7BD7NSV': {
        customers: ['A13TZANIJF7J59', 'A285J5RD3WK39F', 'A29EQGT1N4AF24'],
        groups: ['A1PMOLJQU52LYC', 'A1UW10DCJT8YXX', 'A2SYNPZL4JW82H'],
        industry: 'Consumer Products & Services'
    },
    'A21P6XNC0QVXW4': {
        customers: ['AFBWC6F5MUOR1'],
        groups: ['A333HOAOWQ828J'],
        industry: 'Media, Broadcast & Digital'
    },
    'A267HTHTPFBHZB': {
        customers: ['A3P5ZX1RAYBD7C'],
        groups: ['A16J32ISA2JQ96'],
        industry: 'Technology'
    },
    'A274R9HYNIO95K': {
        customers: ['ALUB8D5SEYQV8'],
        groups: ['A3M2OV7G7VNIFP'],
        industry: 'Retail & Wholesale'
    },
    'A28FTMODCJZKRL': {
        customers: ['A5B79UXZWO0YR'],
        groups: ['A3CV4NDO3N5P5J'],
        industry: 'Healthcare'
    },
    'A2CZFJ2RKY7SE2': {
        customers: ['A16C8ZW8XP7SJQ', 'A1PT9BDHAO1VCB', 'A1QWTS0N88OK23', 'A1WIN5M2PWSQZ7', 'A1XT0K1IA9A52S', 'A2INTQ464S5JWI', 'A2RY12QV8NHKC5', 'A2ZSM2QC7X586F', 'A3391W1A4FN79S', 'A3BMS0W4VNI1F', 'A3CM7ZRRZXDEHD', 'A3SH6SXPFGZ0U3', 'A69OHN8ZLM6E3', 'API6MG3SRT05S'],
        groups: ['A1FDLET16YS4HP', 'A281A0RX4F4DXM', 'A2GZD8OUG3AJVQ', 'A2KLSVBUAFAR44', 'A2OYVYNDDCGYR2', 'A2ZPOWHIOQR22I', 'A3B5ZM7ZMXZG3V', 'A3DHI56QCPWYNT', 'A3UB1GPDI3ENE5', 'AACVZDW8JC0AM', 'AS1TA7XXHPQ8W'],
        industry: 'NA'
    },
    'A2DDN02BEY6XJS': {
        customers: ['A1084ZCYS81WJV', 'A10GTPOKYYU7K0', 'A118IJ6XZAPL99', 'A11UOWFSU66ZKQ', 'A13KH5LHPCOHD', 'A13PTR3EEOB1Q1', 'A14O8MBVPG3DSY', 'A15S3VWT5HI5FY', 'A15UXIT49WLHMK', 'A17LKRXCA7GXQG', 'A17PLBTJPLGIHT', 'A19AN35OHWK01O', 'A19DIYG23POEF8', 'A19HGEGTA6U7U7', 'A1AIN8NFJ2VHLA', 'A1C0LEXU8NTSCW', 'A1C7VHA6E7TL3I', 'A1D5X7XHOPHEWR', 'A1D9S64ATW282K', 'A1E9X4DNXCDCEQ', 'A1ELF3ZJ3ZNZOD', 'A1ERP5ACFMOBDG', 'A1EZ07D51AKPX2', 'A1FBHS3HNRUQBE', 'A1FTYUY3T9KCN0', 'A1FVX19EKQU1QA', 'A1HRBFWABATNM2', 'A1IWCWQYG83JHP', 'A1J6OO9N0PGVM7', 'A1JB6NS2GRTD0O', 'A1JH9H78N2RRP5', 'A1JZ6TVZN4M3F7', 'A1K0NVCD890Y1Z', 'A1KRM01KE1HCS6', 'A1KWL9EGOX9SCF', 'A1LUW7493WHDEE', 'A1LXK6R633K15E', 'A1LZON7S3TL7EM', 'A1MHN5R4P36KK3', 'A1N3GOXC0BCZ2W', 'A1NFW0WX8L4PXD', 'A1NGK962JPQW4X', 'A1NLWJ6EL4V23R', 'A1NWKD9AZEZ23H', 'A1NYZV74KI5WXR', 'A1OEGRLCZM05ME', 'A1ORCAYUZGNR87', 'A1OV6IBXBO3MJA', 'A1P7QW47FD5JVZ', 'A1P9SJL517I34Q', 'A1QP1FKH68IW1G', 'A1R5ADGWQV58B9', 'A1RE2MNOQUD1XD', 'A1S4HPP9BXQJ4K', 'A1SLAQ7UEP2N4Z', 'A1TJNYSRC13S1V', 'A1UNNAV9SE7DRB', 'A1V1DS2PLX8HC', 'A1WABU2K95460R', 'A1X9PJ11C4EYZK', 'A1YPGV9FWAOR5O', 'A1Z0P66J0HCV3', 'A1ZHWDPU6NW7SE', 'A205BCAJ18WZSH', 'A20CLEKHFJBBQ2', 'A21BWOIIRKBGS7', 'A234K4808C59UF', 'A23IT9W45QT7DC', 'A23QJ7WAWIVII0', 'A24BOECFIYJY58', 'A25OY9FQ6XK69O', 'A25VSF2MHVYU18', 'A2749J7UBNHLI9', 'A2776DKVN75VU0', 'A27FQA W4ZAIC3F', 'A27HZ7FC2JJZZ1', 'A27MTX9CFZ1IAX', 'A29H3YVL9GG9XV', 'A29HV63METS1RP', 'A2A3908TPQ0ROJ', 'A2AP9WIC0OI99Y', 'A2BI9KNVEB04PJ', 'A2DCTOBOAQ3A29', 'A2DEFT9865H34H', 'A2DIMHMF0CGH61', 'A2DYKK41WAISUJ', 'A2E8TXFDU9NHKV', 'A2F95ZPSKENFA8', 'A2FXDF5WMSWOR4', 'A2G2ZB3QJXRXYJ', 'A2GEPM4ABNMZYH', 'A2GQRONBIMDI40', 'A2HPMX09HSJXIN', 'A2IDXLGJ78LZB9', 'A2IT4DA3JM6K5K', 'A2J9EAZO5QZ8EJ', 'A2JFQ5PZVPTFWO', 'A2KUJQXNGNIISY', 'A2KXVBHI3W2DMR', 'A2L2K7FRZTST0X', 'A2LJMTXW63649U', 'A2MIVL0MI9DCBG', 'A2MLL3V3W7KVE', 'A2NFSYKBHRD8L2', 'A2NSDWAUIG41GG', 'A2O16BJ8001UX0', 'A2OMG05GA4GI08', 'A2P4IKVKCNVHXL', 'A2PJ98D8NY79AA', 'A2PWX5TL1LH5OW', 'A2QXZV8H8X76QN', 'A2TF41TP559NY7', 'A2VMS7NR2QPZJ7', 'A2VXIS1EVFPQZ9', 'A2WN5GQLYU3CHW', 'A2WNKMAHGKWSEV', 'A2X9702PRILCPE', 'A2Y6MEIC4V6NPM', 'A2YVPG6NCUXELS', 'A2YYYW7DWZBSWK', 'A2Z0XIJVSI5GXY', 'A2ZBEPO0MOKXWL', 'A301C3VSXD7K90', 'A304FLJ19INNMZ', 'A32LVPIVOLOHDT', 'A32N781AL7CE', 'A32NU4T5B7GFRQ', 'A3352PGDHP27A', 'A33F3F5JCRLJU', 'A34217PHD5E47Y', 'A34ETG2JTNA58R', 'A34IK85F4QM9A4', 'A34MJ9XLVCG98N', 'A34R0ZNGDI8GPV', 'A34T9353S1CVFS', 'A35587S3ZY4Q37', 'A35YAEXULF1HMG', 'A36XYAHJIEDIZ3', 'A375CYY2910ZSH', 'A37X977L9JUF05', 'A384R68460I2GV', 'A38660IKS2835J', 'A39BRV7B2HQ85K', 'A3AYXG4EYQML95', 'A3BDNXEUGDTH7B', 'A3BKYYM6PZNYKY', 'A3BW191APLOR7U', 'A3CG4E9ISTBTC2', 'A3E47YK0X0BM49', 'A3E814AGU7C742', 'A3EDZC4HB5IEM4', 'A3EGY98NAB4XI9', 'A3EMO8F5XKKH1H', 'A3FCLKJ9SVRPCL', 'A3FS9IV9H2KZHV', 'A3GJLK7PP4X7O5', 'A3GPWRCI8FC1GA', 'A3GUJ00B3E1LS6', 'A3H3OUULIX7IPW', 'A3INDTCNVAUXUD', 'A3IQQVGLBQL9LG', 'A3J6T0ZF7Z30H9', 'A3M3MF5LNTLGKM', 'A3NB64Y5I78WP5', 'A3NBTVVYS1UKBU', 'A3NMGGF01H80PK', 'A3OA1AP5ID1SSM', 'A3OLBBW5MM8K9Q', 'A3ONZQXOAJNV6I', 'A3OTU0LFV0TVJS', 'A3P0I39QJJ2CYO', 'A3PEAVHAWO79FD', 'A3S06HBUSBPNY4', 'A3SUXGBLNHGT3X', 'A3SXDPKGHEZAQF', 'A3TUT3MU9MAUJU', 'A3TWVH5Z1A38ZG', 'A3U1D49BT4OCH5', 'A3U95X6B2IPQA5', 'A3UXGVGRZF4TQD', 'A3VC3VJIQZAN3J', 'A3VCWSSV47L39H', 'A3W4T37U8SUPOB', 'A428DT4TKFAGC', 'A4SF8NPYM59L5', 'A5W7KGD0OY50V', 'A5Y42S5C4SODL', 'A5ZW94ZK1VQLO', 'A78T5JXIFYEM9', 'A96ZNUW0QPDB4', 'A9HY8M5KFHFBT', 'A9VHF6YLL4C1E', 'AAFCYSIMW8AGL', 'AAN8239HB4YII', 'AAYSF12LINWSN', 'AB8Z5QSUQVEDY', 'ABIURBACAFUGL', 'ABKVH2EW58RIQ', 'ABZAU1R1O2K57', 'AC3Q9S9XX8EJX', 'AC91ZRKN6Z4ZW', 'ACF1KGOQGOEGI', 'ACGVVFNROLLAV', 'ADQ3LSCFU2381', 'ADTKM7NLBCBOM', 'AE6UCNMD4BUJ3', 'AEXC7LNRUZ55H', 'AFPZ3AG75PNDU', 'AFU24UJ2H0XTR', 'AFVTM9YNMHK80', 'AGQPMDLZJRDYF', 'AHGZNPXCNUE2B', 'AHUCU1ORW9FVN', 'AHZLX8Y7QBPA8', 'AJ26OMNUWHPNS', 'AJGCA18J06RMZ', 'AKJ2OQPN0DMLT', 'ALA1POSU23LP7', 'ALJ6WWWE455WM', 'ALNBJXZTG9BMM', 'AMEBY8VJ4BXLD', 'AMLKSAS1V2ELX', 'AMOI0NS4OGXHV', 'AMW1N5QED5YSG', 'ANTEGONXHOFXC', 'ANUIVV35ZV8H3', 'AO0QPSIVSS8LF', 'AO12G1RRLV8GU', 'AOL277KP766V2', 'AOTZN7VNHKI17', 'AP4Y04KL59I8I', 'APBNR7FTGTSJI', 'APJ2UUOAV9P3F', 'ARAJTEY2REMC5', 'ARGL543230EYX', 'ARU12EZYRMC3L', 'ARYS3ZLCSMM0', 'AS82SJ3114ENT', 'AT3M58GJJ8RLG', 'AT3ZNUF6UJLBX', 'AV1VUJMR4DULS', 'AV2FSLQ64PX3Q', 'AVW5GL5HLLGBU', 'AW2EEJ4TGHY', 'AX0EFRKYA7MF', 'AXB77AQ9LB6C0', 'AXBGOE15U2VCF', 'AYJU3LNRHU5ZI', 'AYP1GQNCSGU5H', 'AYWWTOL9KUT36', 'AZ1KUZK21GBUI', 'AZARLNL5VNL8D', 'AZBWAKF4V8EIK'],
        groups: ['A12WSSWY88U6K3', 'A15VYTC3AAIN9U', 'A1724IBC52D6ND', 'A18ECBNES4CRP9', 'A18RPX8HZ0ZTUH', 'A18X8VLBQ7L336', 'A1BBMA1PP26ID2', 'A1CMB62YGBMF0K', 'A1DDR3QB1LPRDO', 'A1GJL30NVQ0G86', 'A1GJWMZGY7A5ZQ', 'A1IED3DGC0CG76', 'A1JKXWMJN3IKZX', 'A1JYZ3PAGFDMML', 'A1KWNC065TMD19', 'A1OZYK5LTL4NPG', 'A1RGIDSC1F0WWH', 'A1VEUYC3U02B2N', 'A26C1VVX1V4XKU', 'A26D9VFWO180QF', 'A27ZYXSLQGLYGX', 'A29BDAXLU47EAI', 'A2AIJF6BUV48AU', 'A2ETQ8JQQBZ4HD', 'A2HVLJ9S6Z63R1', 'A2HZ42H58M4VF9', 'A2I1HSXKVOETG', 'A2I6X7SSM491S6', 'A2J9DRJY63QA26', 'A2M3RK5RD3TEOA', 'A2O13P38OYZ8TK', 'A2PDSRWIJGSHPG', 'A2Q5WNA7D0TOEF', 'A2S8OJL20W5WPI', 'A2V2LC7DZHV7F7', 'A2WF5Y9JBHN46J', 'A2ZCO6IFOAK3X9', 'A34T3K4YUKB9HI', 'A35NR2TL8ZJY47', 'A374EPTEPZ62QS', 'A39TBERR6L10D6', 'A3DWL41V6UBTLW', 'A3FB3R6ENG98QW', 'A3GZ580B2JRG74', 'A3JS6T59L91EMZ', 'A3K5RCAHAP0ZGX', 'A3OQ2WPFOIFM4S', 'A3OT7S0DU2LDWW', 'A3QEEUW4PSOU2C', 'A3S88F0GHQ1S28', 'A3SS9MV7N8D5KO', 'A4KWKD4X8SB24', 'A4R7JLD52WBAZ', 'A4ZO1PEDS0O0S', 'A7AVPRA6Q73ET', 'A8EPVNATQIGR', 'ACKAAW6HQ77TP', 'AD09RHUFHT89Z', 'AE4NMQ6AWFRMK', 'AFX3RKF7ENWS3', 'AIA6I8UROQMFK', 'ALBPOY4WO2NPV', 'AMBLTRK2OJJ47', 'AMJFF67IKT9HD', 'AZCC0UWMIB666'],
        industry: 'Healthcare'
    },
    'A2GWISFELN1ZVX': {
        customers: ['A2B9OI25HCVK1T', 'A33OFS6T6ACX2R', 'AXD7IJY4TQDOX'],
        groups: ['A1K13CWKH659NX'],
        industry: 'Business Services'
    },
    'A2H0USUO4F5GQE': {
        customers: ['A13XI9NI349T34', 'A1ZUITT6TSW2M6', 'A2W17IZZM33X29', 'AGRNXV9DZ1NK4'],
        groups: ['A29K4HMKOA7QX8'],
        industry: 'Manufacturing'
    },
   'A2L2CX92RTR0W7': {
    customers: ['A185MYDRGCLGJE'],
    groups: ['A2UMUWMBHR914R'],
    industry: 'Consumer Products & Services'
  },
  'A2PD9XRDJ93DSZ': {
    customers: ['A3GB1BQT4P0JZR'],
    groups: ['A7DP371990URX'],
    industry: 'Restaurant'
  },
  'A2PEZSEV5DC2PJ': {
    customers: ['APBCAYABU0LWW'],
    groups: ['A28TLE3YGQ13F'],
    industry: 'Healthcare'
    },
    'A2X722WEIW3MFN': {
        customers: ['A3L8CD2ZRCRQMN'],
        groups: ['A171FQB0LKW20J'],
        industry: 'Business Services'
    },
    'A2Y1QG90SVDBE': {
        customers: ['A2FG9GE1FO91A3', 'A32AW9DKHN9GG5'],
        groups: ['A1RC5L27C0I4RU'],
            industry: 'NA'

    },
    'A2ZQGF1FSMECCC': {
        customers: ['A18J13PC7HMJX3'],
        groups: ['A1OS3XLV9NOYMP'],
            industry: 'Business Services'

    },
    'A2ZR96XKPR745O': {
        customers: ['A12X2JBCSISVVO', 'A3AXUMRVH6VL20'],
        groups: ['A18TBFULFW10VP', 'A1EE6XNDHXRAMV', 'A1V9QV3PN53UV6', 'A1WFPNI6AF3DHP', 'A21FLG3ZV9ZOUS', 'A2JMQ78L6Z86J5', 'A2NMHS1Y2BR00W', 'A2VPPM5ZSCLT5R', 'A3BLNAJGTOM7ZC', 'A3IBO24E911I3Q', 'A3IQ3HJX5RD44W', 'A3OW0KG8JD9553', 'A3VQGC6DP3TQKF', 'ABWRKU1JMF6EC', 'AZCFG0XEM9P3B'],
            industry: 'Business Services'

    },
    'A312NM2DER0GBB': {
        customers: ['AS0SCJWDJ9RFW'],
        groups: ['A16DJEZA5EUBNN'],
            industry: 'Retail & Wholesale'

    },
    'A35LG6ELLJ5QG': {
        customers: ['A2NC5A5YKVN7SC', 'A3HR9DN75CUI2B', 'A4WUB5KU23WLH'],
        groups: ['A13YY9JFG8HL1T', 'A1KOP7XT6QOOEF', 'A2PUVX2TCUDMDV', 'A3D02EFQLS6J2K', 'APVLH37GP1JN0'],
                    industry: 'Healthcare'

    },
    'A35V0GQYS2ZQ2O': {
        customers: ['A356M4SHVWO1UW'],
        groups: ['A3UY66CB0FU36O'],
                    industry: 'NA'

    },
    'A3609BB60JH350': {
        customers: ['A1PGGODT1PWXTD', 'A27BOG2ZAAF9K5', 'A28H8RYSZNBM0Y', 'A2FOW8TS42UZS9'],
        groups: ['A1PLZMUVK4LVGU'],
                    industry: 'Retail & Wholesale'

    },
    'A370G1S2GNUECI': {
        customers: ['A2AQPNMZG913KV'],
        groups: ['A1Z2AQGETET1OB'],
                    industry: 'Business Services'

    },
    'A3778QYP3W4G26': {
        customers: ['A6YC0S1TJM661', 'ACZC993TDL6BT'],
        groups: ['A27PRCPR8Q3NV6'],
                    industry: 'Retail & Wholesale'

    },
    'A37RY0TYJ6MMHG': {
        customers: ['A1Q9AOYM932AAD'],
        groups: ['ALGW9ND2VY70T'],
                    industry: 'Retail & Wholesale'

    },
    'A39QJWRXYA089G': {
        customers: ['A20KM008O6EG4S'],
        groups: ['ABQ6G4XMNXQSC'],
                    industry: 'Healthcare'

    },
    'A39QQYTYL7OUIC': {
        customers: ['A37DUP68ZJYJBF', 'A3NQJKUDI3BB8T'],
        groups: ['A14X5FV9VIOTRD'],
                    industry: 'Business Services'

    },
    'A3CEED7SAF8R34': {
        customers: ['A3SAYE5GZ4UIZ3'],
        groups: ['A2L8Q52PKSNS74'],
                    industry: 'Business Services'

    },
    'A3CH0YLK252FTA': {
        customers: ['A1P0L8QFEGZ7HN', 'A2CCXOP8ZXAZAR', 'A2D8GI65DI0BYO'],
        groups: ['A34NBGK2DSESCT', 'ASABRRCF8K5EQ'],
                    industry: 'Non-Profit'

    },
    'A3D3KZQZLI7UQT': {
        customers: ['A2MY62U8TZ7XSS'],
        groups: ['A1MK2ZCLUG9WZT', 'AVL9B2BPAVKYW'],
                    industry: 'Retail & Wholesale'

    },
    'A3D5MVMBPAV53J': {
        customers: ['A2EXE4W0P94YVF'],
        groups: ['AY5PH7VR2T64B'],
                    industry: 'NA'

    },
    'A3E4MEQSDBF3GP': {
        customers: ['A28IHEY7M2YMQD'],
        groups: ['A2UBKW16GPUJUQ'],
                    industry: 'NA'

    },
    'A3GBLZOTS6U2HO': {
        cuscustomers: ['AUK3KJZJJQSZV'],
        groups: ['A2DMHK7XC1QEL8'],
                    industry: 'NA'

    },
    'A3JD1C6D7KL9MD': {
        customers: ['A102C76X3W1TGN', 'A10C4Z505SVPUV', 'A10ZSJL4CAHXGK', 'A11XWSOMC90I1P', 'A11ZWH72SC6KRD', 'A12LMH1O0G6UMU', 'A130ZVAKVD3JTA', 'A136GDE8240UDR', 'A139QPLO2BWCH7', 'A13P8AJ46FG1VB', 'A14BQCQMTVIT9C', 'A14TLMKYBGL36Y', 'A14X8GTR36W5N3', 'A15P9HR9PY7KZJ', 'A16X330DQ56IK4', 'A17OAHWVZJEY9U', 'A18A9TIKK0PVIR', 'A18NA8T8NY0L7W', 'A18NHW6TNY0F46', 'A18STQOVOYWA8J', 'A190FC9TP4SW1Q', 'A19BF38MGHM17E', 'A19X1T0I15VJZS', 'A1A1LHNVX8PGOX', 'A1AP903XRAJ0FQ', 'A1AXKIVGUZEB63', 'A1AZZ670O4059I', 'A1B6CIP3GBXDAI', 'A1BKX9LPG9AVXL', 'A1C9JXVQZZYCVZ', 'A1CAOMMIGSUE1F', 'A1DHMZDZL1MI0C', 'A1DOL1DCNEKA5M', 'A1DSGOI1141IQZ', 'A1F2IWI3485PX7', 'A1G83V6EX9M9YE', 'A1GZNGQRQVA6FB', 'A1I1EFS5A1ZHRJ', 'A1I85PRA2INL4P', 'A1I8XXM90Z49B6', 'A1IGMAGN0D26YN', 'A1IKWW5XOPULET', 'A1ILAHAFTCUCDL', 'A1IMM8KYZ7QRBS', 'A1IV72S7ZEY95V', 'A1J830JCL3SNC9', 'A1JEK676HJN02C', 'A1JKA5R3V0B5AX', 'A1K2IXERAENQLX', 'A1LNG4WKE9R869', 'A1M19EY93J1VFO', 'A1MC18J842SIGK', 'A1MGSEY6M6JSCU', 'A1MJSGYWURBOZ3', 'A1NB92CB89R7GD', 'A1OD7W4DZP8C8A', 'A1OFH9G1CMBKST', 'A1OZPAQ4Q72BDE', 'A1P91CF2EMZ480', 'A1PZ637LAX2BW8', 'A1Q8S8LR52703H', 'A1QP13LMMHHF5', 'A1SE3T1DB2VCGP', 'A1SHE23CEVGH9', 'A1T1CEGIIYEQFK', 'A1TN1HCJ71SV5E', 'A1UZHSMZLCISCV', 'A1V5T9NZ8TQY96', 'A1V9LNAQVCIAOA', 'A1VJ3AMELJ9P7U', 'A1WN1X3FZZ4SG1', 'A1YE8F9LFS7454', 'A1YENK26J6STW4', 'A1ZMH769EHNH91', 'A1ZW1IP1GRYBOB', 'A1ZYTRD52634DV', 'A20B1INR1SZ5RA', 'A20BCGCSWFY5PH', 'A216SCHFZD4ZPS', 'A217MBEN4XPSIP', 'A21AQ4Y25FMJJ0', 'A222KY8ZL5EFOQ', 'A2259GZB67OWSG', 'A22H93DIJ4EN0B', 'A22S76TJ1G81TZ', 'A23EUYFM5ICR9S', 'A23JYF2S8HLSTG', 'A24YUO2P2QJIU5', 'A253LQ9QTJQTO3', 'A25XYR43UMGZO2', 'A2638MK5PJV1MI', 'A263DLTBIX1ABG', 'A26WMUUVCJBD90', 'A275BOHUEVA8LT', 'A27Y7MWWU1Z3AP', 'A280CUCWU04U20', 'A2876J22BVW2HI', 'A28BD6OETK0BES', 'A298V54O5FJ4DW', 'A29GRKHR5OX8TB', 'A29X3599Q7AU4T', 'A2AIFNPUXQALGP', 'A2B3JU7GC4YOER', 'A2BBWAFURVKPXY', 'A2BWJLCF6GHZHU', 'A2CBTL4AMTG73J', 'A2CRBKFRI8E964', 'A2CZAS7HRICY71', 'A2DBKMROE5QQ4A', 'A2DFWIK9MF8IEV', 'A2E63ZKB37SYBC', 'A2ETWH5AF96W1V', 'A2EZUSV4NZSB8N', 'A2FFKNIDJNHJP6', 'A2G5FSKHY30URJ', 'A2GOOGQAULF5VI', 'A2GUM32O25BDT2', 'A2GUWF5JHTLSQ2', 'A2ISE2H18UM30H', 'A2J3GUOTT0HBW6', 'A2JKMSQRYW17TY', 'A2KBRO7L4YDUSA',   'A2KQ97FDZ4LBAI', 'A2KQNDRP6GW3WF', 'A2KYRL1P8C9J60', 'A2L1G4WWJYAO90', 'A2LLN7SNO7V1D', 'A2LR75Z1G757AJ', 'A2MWQAB4WVN5JI', 'A2PV9X7APOBTJ4', 'A2Q3IKQOCQI5AV', 'A2QJRDOVFLIFEA', 'A2RX0T7QMOTA3A', 'A2SB545OQHNXQV', 'A2SSGG507S3XF3', 'A2TMJHLB66RI2H', 'A2UMLMBMKBUL6A', 'A2UW5592NDZFEC', 'A2VKSF4P2HY30H', 'A2WK6693REEMGN', 'A2WSV6VTVBHUGY', 'A2WZT53CUHQ60B', 'A2XV1DWLZ06AIC', 'A2Y9INHFMBMO72', 'A2YSS0JQGOKDC', 'A2YXWS79EXOWAY', 'A2Z043WUCJCKI8', 'A2Z1V6GBYCIXYV', 'A2Z86Z0KFHY56Z', 'A2ZP1JYTXEIJZX', 'A2ZZ95NI95H093', 'A30FVTTXWRRP13', 'A310U8QHH64K4Z', 'A319NE7KR1P3O9', 'A31YQVQJJ6OE0U', 'A32ZNP51G9POD6', 'A338SUCEKEMDNN', 'A33FQTN0APKE57', 'A34FYRJX6WE39O', 'A34IN77YSPY2KV', 'A358OQYBOI04D4', 'A35TA4YPNU2KZF', 'A363F7F3EFZ4B7', 'A3648NPGYXJHV9', 'A3684WBX0U0RH9', 'A36O2EMYQMPQ0K', 'A36VIY4ZU50BB4', 'A37GWDENUW21IE', 'A38IB0LXKL5AAR', 'A38YCBK79T96TD', 'A3AD72U2XHWAYU', 'A3AGSHFW3W5Z84', 'A3B0HYPFSQ8GJ1', 'A3B8OOYZP9QHRM', 'A3BAGJPXNVVPHG', 'A3C139A9CEZJVH', 'A3D6C7RHT2FFW0', 'A3D8NXAGROJHI8', 'A3DJS2YCT30PBQ', 'A3DWCUFB9O3CDF', 'A3E2NMZH4JCX0F', 'A3ED9916TSWD5C', 'A3FKKXBX6SWLJL', 'A3FX6QYVKCXPW4', 'A3HI3U99WZSJNI', 'A3HJOD5XV9NNA3', 'A3I3MA797U9JNB', 'A3KAHCZ2GG1DYY', 'A3KCIDG5V5BEA7', 'A3KXQQB2A73ZS3', 'A3L3ZTUJE2W3NB', 'A3LAM95J3R1EF6', 'A3LSWDOZ7N60JS', 'A3MRF3RESXDTZC', 'A3N0I7RP3D0YYX', 'A3OAGQ5UO8M690', 'A3P27YYVZVCJZW', 'A3P6MQ6MQ78ZXOR9G', 'A3PKGBFEZYJ3ED', 'A3QV23Z0NHFQPG', 'A3QYNXKHLWXP1Y', 'A3RT8YN95SYYFA', 'A3S00HLTM6DXFP', 'A3SAGJK8KMVU2Z', 'A3SBBXT5Y06DTF', 'A3SD1CF4376I13', 'A3SFIQ58R4OXL2', 'A3SNH820QGH9AE', 'A3SVGRN4MK2ZJA', 'A3T3MRVWISMK8Y', 'A3TVWSZEXLZMLM', 'A3TWWN8WJ54Q13', 'A3TXVEYX9UWKBU', 'A3TYJV9ZI6VY1R', 'A3UAMR1KFWB55A', 'A3UCHEYCIU5BRJ', 'A3UV6WD1046A7Q', 'A3VHELRXPSZWKY', 'A4IYZVI5SX257', 'A4O0OB47FPVH1', 'A4Y4T1SV4V8BH', 'A5M5DW7QYLNYY', 'A5YEEIZMBE6JH', 'A6I3B2YEAAXG', 'A6NGWZQCNOUHD', 'A6W90CHI8EXQS', 'A76PPBJXYPLVW', 'A92NJC2BJY652', 'A94LRWCMGH6Y1', 'A996IQN1XSSKD', 'A9M8TRO7L3YWB', 'AA23X74IM2M1M', 'AALEIWHNDQOJV', 'AB3JQJBYZ7GBU', 'AB3Q8H54SR6XL', 'AB4YJW2K5H1VA', 'ABU0PR554338H', 'ABWMQDJ17Y6WO', 'ABWQACEZLCTCG', 'ACDVU62479T0J', 'ACKQDXVJWULKP', 'ACP9PT3BJOGCU', 'ACUS975YB650L', 'ACZA2HBX6R7JE', 'AD4D4MK164KLB', 'AD9C2L1CE662M', 'AEXKDAFJ0VNRD', 'AF64BX6C8G4C7', 'AF6PD5OF1AGVP', 'AFAR4N15FLAAB', 'AFR78PCPVVC7Y', 'AG3SN34GWC6GU', 'AGJVGUTY7RSS', 'AGK02WJIU89BB', 'AGL11O325MFCI', 'AGLDOE17KQQJ6', 'AGWL3Q499FYSZ', 'AIIKLLF625AXO', 'AIV6PK017O085', 'AJ9LOY4MCA583', 'AK7FBARXFICPL', 'AKQM5NJU3HT34', 'ALDLPNKMRBOHO', 'ALENZ45FFXBTD', 'ALQYQJ846614K', 'AMD1984CT626Z', 'AMRIY5I7STVGX', 'AMVOKMQOREQTN', 'ANE0YORHDDOU6', 'ANGSOOH9SVRHC', 'ANIGOK6YDB1PE', 'ANQMTXMTM8P0M', 'ANRNL48CVWL98', 'ANUYTSVDUTSQV', 'ANUZQ0QTIJNZD', 'ANWDZH7K4ZC2L', 'AP4SLWWZ1UC6L', 'APSH9UAZ6A3OD', 'AQ9OKPF8HFHDX', 'AQGGVY4ZMKY3X', 'AQT799ZNYSU3R', 'ARRNQY3TMT87W', 'ARWB7C78YXC3B', 'ASBW7IMNLC3AY', 'AT1DIFZIEIFM2', 'AT37PXQRJBP89', 'AT8GYN6OB3C4H', 'ATSD5IQPVEUX0', 'ATSY8ZE49EDA4', 'AU0WHSD6A2L1W', 'AU5U9S62FL30C', 'AUOX1L5ZX8MOD', 'AW1JJZUYF5UW4', 'AWXZAI3EJ5JCU', 'AWZRYYVDTTL7G', 'AXJP0YT9XHM4D', 'AYH6RB5ZQ22K2', 'AYI1R4670MD8S', 'AYNTVAE1INZIF', 'AYX4XP7LDGYOU', 'AZ7O1S7Q95TJI', 'AZFEMZOTOAVFM'],
        groups: ['A1HVWC7OJ0UXO7', 'A2V0GK9CAGH7US'],
                    industry: 'Retail & Wholesale'

    },
    'A3KP13RPPN85KI': {
        customers: ['A23VU8JMAMP10H'],
        groups: ['A3DU1GB1VQMY2C'],
                    industry: 'NA'

    },
    'A3LGA4SX50K0ED': {
        customers: ['A1MJX6RYF8XIN3', 'A2XEBS6537MPKL', 'A397S5VYOJG5KO'],
        groups: ['A2R13VCXJ0CIA4', 'AE68VKO23M7CH'],
                    industry: 'Retail & Wholesale'

    },
    'A3LHPKNIO8VK5': {
        customers: ['A2PTU6GECV4YP7'],
        groups: ['A2K81DWECCOGL0'],
                    industry: 'NA'

    },
    'A3LVWDECZ1XIZ6': {
        customers: ['A26QQ5PJJXDN0Z'],
        groups: ['AB1NPG6K3AP5U'],
                    industry: 'Retail & Wholesale'

    },
    'A3MAWJX8SY94A': {
        customers: ['A1JPV2TZ02AXIB', 'A1P9OXKCR358SR', 'A2DC7I11LG8LPZ', 'A2MM0IDGJ0HGNL', 'A357QP5O85P84L', 'A3OW08NEQDFV0I', 'AKOTGYE59T10U'],
        groups: ['A1409HA5ZVEO7G', 'A3PW9TRMWA2RTE', 'A71JX87NXOA88', 'ATTWKEQRMO3U2'],
                    industry: 'Financial Services'

    },
    'A3N7LWCZH0F15T': {
        customers: ['A145EEGJA8IER5', 'A26LK3YAGNYWL7'],
        groups: ['A3RRRS08YQVARC'],
                    industry: 'Education'

    },
    'A3O156DXUUDB64': {
        customers: ['A1D6GX13KXGQPI', 'A2PRCF1ZKUJ0V', 'A38TT58YPORUBH', 'A3K7K8L04VHG6Y', 'AFI0ZP5RCIK4T', 'AQKJ9KBZ15IBT', 'ARK7L3O4S90SO'],
        groups: ['A2NFPOB59ZY0GW'],
                    industry: 'Business Services'

    },
    'A3Q7A6IWN4IX9P': {
        customers: ['A153EYTWLGTHQA', 'A3NA68842FTIB6'],
        groups: ['A35EJ20ZWK3QSO', 'ANI4RPK587RLL', 'AU2Y1GZHM9BPR'],
                    industry: 'Construction'

    },
    'A3QKDGCYYRNZHT': {
        customers: ['A192OY3IHDJF96', 'A19B0BJKJP9CYJ', 'A1A440IC7F2MQZ', 'A1AIDX9YFFKG26', 'A1AZHNBCQU0F3N', 'A1BF4Y2JAZTMXD', 'A1DQWVA9E91Z7N', 'A1GR7L6F33MHK2', 'A1MJD5PK6BT6E5', 'A1P7P2LE0TL0QQ', 'A1PZ6KZMBGWNDN', 'A1T5I0CYGARSZX', 'A1YWQVXVEWZIGB', 'A214ODVPRN7RJN', 'A22HO20UHT5HO2', 'A24RN9DMC1DOYO', 'A24W9AIGRHQS3A', 'A26F2GZ632S345', 'A26XRPWAN15S3C', 'A2DWNLLLT7R9RZ', 'A2EZIL0PW0D05P', 'A2HVKMRMCRFG70', 'A2KSPX3OSL1TAW', 'A2MRQL7W5XYBRC', 'A2PKH5C80QM7LV', 'A2RVO43WKFQUN9', 'A2TM98QGU0O0XY', 'A2WKKYDI6AVUOJ', 'A31SA7FNHDEHA5', 'A36S2HI9X9L63Q', 'A37B41X7D4F65M', 'A37S2MDP2V4YYI', 'A3G27Y3DELCO57', 'A3JVX0JT8Q22ZA', 'A3K34LYCW8EVI8', 'A3K62ON9YKARAJ', 'A3LBIKNENINT4B', 'A3MYP2XPXY71UT', 'A3NVBJOGPSHP1S', 'A3PTP8IQJHTIMW', 'A6ACUBQ6C8D9H', 'ABSL022Y6ES5U', 'AGN602N7VRSOS', 'AGS4P2X4AZ6GW', 'AQXZ8AFU9NAPV', 'AR2SDQQC79TNS', 'ASB7ZD05WW051', 'AYZYRP2Q72KAJ'],
        groups: ['A11WPK35RTFXFR', 'A15DE7HH66EWD7', 'A15ZTHWFPT2RJY', 'A19LM3D0XEZ3JK',  'A1QG1LAKYXNDAG', 'A1STT3VA00MIHU', 'A1V6J2BL2RE2V9', 'A1ZH069Q1MJFZ4', 'A2HZ6AXQRIXBK2', 'A2KON14KZBV23W', 'A2PW4KU1PQWOWN', 'A2RCMSO7L401ZL', 'A2RHB4U2LAR8YY', 'A2SM5VJ9296QIQ', 'A2TWZWDCJNZZ17', 'A35R03FEFNRG6O', 'A3C2QJZY7Y78H9', 'A3D8UHHJQD3D3P', 'A3U353F3HO19R0', 'A3VM3KOLN3T9MU'],
                    industry: 'Consumer Products & Services'

    },
    'A3RK7VBLGJAICS': {
        customers: ['A1X57TU4ZV48YQ'],
        groups: ['AMQ9NVOI3QSTH'],
                    industry: 'Retail & Wholesale'

    },
    'A3T4TT2Z381HKD': {
        customers: ['A2V64NK86KXNUD', 'AJM8PSRZ1B43P'],
        groups: ['A2BVFN7BFI93JF', 'A3AJCEXTO911D0', 'A3RWHWYV83BKEL', 'ANQHTVN0J76FW'],
                    industry: 'Business Services'

    },
    'A3TXV4NLRBLJS2': {
        customers: ['A12B1FQH8K6YKA'],
        groups: ['A1BV6SOMS3NTFN'],
                    industry: 'Healthcare'

    },
    'A3U79R9ID7YZ2E': {
        customers: ['A176U2YYP2QE5Q', 'A3DOEIE8MWKDXD', 'AX352SXBBG7TG'],
        groups: ['A14H8PPP0EETH3', 'A16Q00DDCCU8AL', 'A1V22RIPP0D54M', 'A1V4SD20MINLKR', 'A1ZQLPB0Y334BU', 'A1ZWOGOJR3IJUL', 'A29I61QMOUIN2O', 'A3DGCLLM4DW424', 'A3E72309LOBVE2', 'A5HVB4KQ7DV4V', 'ALYOGKV1I367G'],
                    industry: 'Healthcare'

    },
    'A45UOIWHPCVYM': {
        customers: ['AQYO71TUHYT2'],
        groups: ['A2I8947397I6AR'],
                    industry: 'Technology'

    },
    'A4ME731YV3D32': {
        customers: ['A14R1MHXL6ILB9', 'A3FIZKEG7HKEXB', 'A3S9RR45CYG5KG', 'AWKTPLXYD63V', 'AZDJJZ8CDH8PC'],
        groups: ['ARYBKE0UWD6H3'],
                    industry: 'NA'

    },
    'A7CST20YFVNOG': {
        customers: ['A14E60YKD1TF5A', 'A1TCAZ71R119H1', 'A3L4S9PBLFFQ1S'],
        groups: ['A14ZCH8IFLWS6W'],
                    industry: 'NA'

    },
    'A8NXBPEM3UI45': {
        customers: ['A1DJNV4ZNU02PJ'],
        groups: ['AXQEEEPF17X2O'],
                    industry: 'Technology'

    },
    'ACHKBEG1GG587': {
        customers: ['A2G74HZI8H1WOE'],
        groups: ['A1TOXL4EX0O4SS'],
                    industry: 'NA'

    },
    'AE6V1UPT9ROQ0': {
        customers: ['A2G3WSY4D1G7TR'],
        groups: ['A3HY41H661TKB'],
                    industry: 'Retail & Wholesale'

    },
    'AH8GCH5M08N1L': {
        customers: ['A350H295D56390'],
        groups: ['AMPG0ERYSGLKM'],
                    industry: 'NA'

    },
    'AV5LS9SCNW31R': {
        customers: ['A19N5ITTVGY62E', 'A284Y2JBD8ZQGY', 'A3CJ0QTK1N0BIB', 'AUNKHT38RO1OE'],
        groups: ['A1VS5NK6F1HPW2', 'A29Q51M7E4QFEX'],
                    industry: 'Technology'

    },
    'AVAYVJ50XCMXI': {
        customers: ['AQR1L1XHNFY09'],
        groups: ['A2HN1AOPO1B8HU'],
                    industry: 'NA'

    },
    'AVNZ46JHC939O': {
        customers: ['A1ITI57EW71ZOQ', 'A2LQOLF0EIODUV', 'A3RQZ89O527R9D', 'A53I4AOIPZH0R', 'A5N6BIR0T6QBI', 'ASE4I8QTSX3Q4', 'AT9ML780ST5EN'],
        groups: ['A1YO8KEUJ5TYJV', 'AMFO8EPZ40NFW'],
                    industry: 'Education'

    },
    'AW4P1UKIRHHVQ': {
        customers: ['A2DUGLPQB7YD9R'],
        groups: ['A78M6906ZJ9WU'],
                    industry: 'Technology'

    },
    'AXUIGTF417T0D': {
        customers: ['A1C0QLMFVEFHY9', 'A1KVOE7192O1Z9', 'A2F1LFG1BR53P8', 'A32WEDB24D2RXI', 'A37W0SG2NTD8K7', 'A3837Q91R6U73X', 'A3BL9HWSMKYDLJ', 'AH1B2DA87RUCY', 'ALSINWG6VGVM1'],
        groups: ['A1DU213JITJZSX', 'A29U1OQJHXG9UU'],
                    industry: 'Retail & Wholesale'

    },
    'AYZAHGLH9FDBW': {
        customers: ['A381SV152ORNMS'],
        groups: ['A2TWRLHHBAO9AM'],
                    industry: 'Transportation'


 }
    };

    // Helper function to clean number inputs
    function cleanNumberInput(value) {
        return parseFloat(String(value).replace(/\s+/g, '')) || 0;
    }

    // Copy function
    function copyToClipboard(text, button) {
        navigator.clipboard.writeText(text).then(() => {
            const originalHTML = button.innerHTML;
            button.innerHTML = '✓';
            button.style.color = '#4CAF50';
            setTimeout(() => {
                button.innerHTML = originalHTML;
                button.style.color = '';
            }, 800);
        }).catch(() => {
            button.innerHTML = '✗';
            button.style.color = '#f44336';
            setTimeout(() => button.innerHTML = '📋', 800);
        });
    }

    // Create copy button for ID matcher
    function createCopyButton(id) {
        const copyBtn = document.createElement('button');
        copyBtn.innerHTML = '📋';
        copyBtn.style.cssText = `
            margin-left: 2px;
            padding: 2px 4px;
            cursor: pointer;
            border: none;
            background: #4facfe;
            color: white;
            border-radius: 3px;
            font-size: 9px;
        `;
        copyBtn.onclick = (e) => {
            e.stopPropagation();
            copyToClipboard(id, copyBtn);
        };
        return copyBtn;
    }

    // Copy function for calculator results
    window.copyResult = function (elementId) {
        let text = document.getElementById(elementId).textContent;
        if (elementId === 'priceTotal') {
            text = '$' + parseFloat(text).toFixed(2);
        } else if (elementId === 'savingsResult') {
            text = parseFloat(text.replace('Savings: ', '')).toFixed(2) + '%';
        } else if (elementId === 'bulkResultPercent') {
            text = text;
        }
        const copyButton = document.querySelector(`#${elementId}`).nextElementSibling;
        copyToClipboard(text, copyButton);
    };

    // Create main floating bar
    const floatingBar = document.createElement('div');
    floatingBar.style.cssText = `
        position: fixed !important;
        top: 20px !important;
        left: 50% !important;
        transform: translateX(-50%) !important;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
        border-radius: 6px !important;
        padding: 4px !important;
        z-index: 999999 !important;
        box-shadow: 0 2px 8px rgba(102, 126, 234, 0.4) !important;
        width: 250px !important;
        min-width: 220px !important;
        max-width: 450px !important;
        font-family: 'Segoe UI', sans-serif !important;
        font-size: 10px !important;
        border: 1px solid rgba(255, 255, 255, 0.2) !important;
        overflow: hidden !important;
        display: flex !important;
        flex-direction: column !important;
        max-height: 90vh !important;
    `;

    // Toggle button
    const toggleButton = document.createElement('button');
    toggleButton.innerHTML = '−';
    toggleButton.style.cssText = `
        position: absolute !important;
        right: 2px !important;
        top: 2px !important;
        cursor: pointer !important;
        border: none !important;
        background: rgba(255, 255, 255, 0.2) !important;
        color: white !important;
        font-size: 12px !important;
        width: 16px !important;
        height: 16px !important;
        border-radius: 2px !important;
        line-height: 1 !important;
    `;

    // Title
    const titleDiv = document.createElement('div');
    titleDiv.innerHTML = '🛠️ Multi-Tool Bar';
    titleDiv.style.cssText = `
        color: white;
        font-size: 11px;
        font-weight: bold;
        text-align: center;
        margin-bottom: 4px;
        padding-right: 16px;
        cursor: move;
        user-select: none;
    `;

    // Tool selector dropdown
    const toolSelect = document.createElement('select');
    toolSelect.style.cssText = `
        width: 100%;
        margin-bottom: 4px;
        padding: 4px;
        border: none;
        border-radius: 3px;
        background: rgba(255, 255, 255, 0.95);
        font-size: 10px;
        font-weight: 600;
        cursor: pointer;
    `;

    // Add tool options
    const tools = [
        { value: '', text: 'Select Tool' },
        { value: 'calculator', text: '🧮 Calculator' },
        { value: 'idmatcher', text: '💰 ID Matcher' },
        { value: 'bulkcalc', text: '📊 Multi-ASIN Savings Calculator' },
        { value: 'responsegen', text: '💬 Response Generator' }
    ];

    tools.forEach(tool => {
        const option = document.createElement('option');
        option.value = tool.value;
        option.text = tool.text;
        toolSelect.appendChild(option);
    });

    // Content container
    const contentContainer = document.createElement('div');
    contentContainer.style.cssText = `
        overflow-y: auto;
        flex-grow: 1;
        min-height: 0;
    `;

    // ========== CALCULATOR CONTENT ==========
    const calculatorContent = document.createElement('div');
    calculatorContent.id = 'calculatorContent';
    calculatorContent.style.display = 'none';
    calculatorContent.innerHTML = `
    <style>
        #priceInputs, #savingsInputs {
            display: flex;
            flex-wrap: wrap;
            gap: 4px;
        }

        #priceInputs input, #savingsInputs input {
            flex: 1;
            min-width: 45%;
            box-sizing: border-box;
        }

        .savings-row {
            display: flex;
            width: 100%;
            gap: 4px;
        }

        .savings-row input {
            flex: 1;
            min-width: 45%;
        }

        .calc-header {
            cursor: pointer;
            font-weight: bold;
            padding: 0.3em;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 0.25em;
            margin-bottom: 0.3em;
            font-size: 0.9em;
            user-select: none;
            color: #333;
        }

        .calc-content {
            display: none;
            padding: 0.3em;
            margin-bottom: 0.3em;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 3px;
        }

        .savings-row input {
            width: 48%;
            padding: 1.0em;
            border: 1px solid #ccc;
            border-radius: 0.25em;
            font-size: 1.4em;
            font-weight: 600;
        }

        .calc-button-group {
            display: flex;
            gap: 0.3em;
            margin: 0.3em 0;
        }

        .calc-button-group button {
            flex: 1;
            padding: 1.0em;
            font-size: 15px;
            font-weight: 700;
            border: 1px solid #ccc;
            border-radius: 0.25em;
            background: #f8f8f8;
            cursor: pointer;
        }

        .header-labels {
            display: flex;
            justify-content: space-between;
            padding: 0 0.3em;
            margin-bottom: 0.3em;
            font-weight: 800;
            font-size: 1.1em;
        }

        .header-labels span {
            width: 48%;
        }

        #priceInputs input {
            width: 100%;
            margin-bottom: 0.5em;
            padding: 1.0em;
            border: 1px solid #ccc;
            border-radius: 0.25em;
            font-size: 16px;
            font-weight: 700;
        }

        .calc-info-text {
            font-size: 15px;
            font-weight: 700;
            margin-top: 0.5em;
        }

        .calc-copy-button {
            cursor: pointer;
            margin-left: 0.3em;
            font-size: 0.9em;
            color: #0066c0;
            user-select: none;
        }

        #savingsResult {
            font-weight: 800;
            font-size: 1.2em;
            color: #2e7d32;
        }

        .calc-copy-button:hover {
            color: #c45500;
        }

        .calc-result-container {
            display: flex;
            align-items: center;
            gap: 0.3em;
        }
    </style>

    <div id="savingsPercentageHeader" class="calc-header">▼ Savings %</div>
    <div id="savingsPercentageContent" class="calc-content">
        <div class="header-labels">
            <span>Price</span>
            <span>Save</span>
        </div>
        <div id="savingsInputs">
            <div class="savings-row">
                <input type="text" class="priceInput" placeholder="Price 1">
                <input type="text" class="saveInput" placeholder="Save 1">
            </div>
            <div class="savings-row">
                <input type="text" class="priceInput" placeholder="Price 2">
                <input type="text" class="saveInput" placeholder="Save 2">
            </div>
        </div>
        <div class="calc-button-group">
            <button id="addSavingsField">+</button>
            <button id="removeSavingsField">-</button>
        </div>
        <div class="calc-button-group">
            <button id="calcBtn">Calc %</button>
            <button id="resetSavings">Reset</button>
        </div>
        <div class="calc-info-text">
            Items: <span id="savingsItemCount">2</span>
            <div class="calc-result-container">
                <span id="savingsResult"></span>
                <span class="calc-copy-button" onclick="copyResult('savingsResult')">📋</span>
            </div>
        </div>
    </div>

    <div id="priceTotalHeader" class="calc-header">▼ Price Total</div>
    <div id="priceTotalContent" class="calc-content">
        <div id="priceInputs">
            <input type="text" class="priceInput" placeholder="Enter price">
        </div>
        <div class="calc-button-group">
            <button id="addPriceField">+</button>
            <button id="removePriceField">-</button>
        </div>
        <div class="calc-button-group">
            <button id="calculateTotal">Calc Total</button>
            <button id="resetTotal">Reset</button>
        </div>
        <div class="calc-info-text">
            Items: <span id="itemCount">1</span>
            <div class="calc-result-container">
                Total: $<span id="priceTotal">0.00</span>
                <span class="calc-copy-button" onclick="copyResult('priceTotal')">📋</span>
            </div>
        </div>
    </div>
    `;

    // ========== ID MATCHER CONTENT ==========
    const idMatcherContent = document.createElement('div');
    idMatcherContent.id = 'idMatcherContent';
    idMatcherContent.style.display = 'none';

    // Program select for ID matcher
    const programSelect = document.createElement('select');
    programSelect.style.cssText = `
        width: 100%;
        margin-bottom: 4px;
        padding: 4px;
        border: none;
        border-radius: 3px;
        background: rgba(255, 255, 255, 0.95);
        font-size: 10px;
        font-weight: 600;
        cursor: pointer;
    `;

    // Add program options
    const programs = [
        { value: '', text: 'Select Program' },
        { value: 'sns', text: 'SNS' },
        { value: 'mp', text: 'MP' },
        { value: 'bbqd', text: 'BBQD' }
    ];

    programs.forEach(program => {
        const option = document.createElement('option');
        option.value = program.value;
        option.text = program.text;
        programSelect.appendChild(option);
    });

    // Business select for ID matcher
    const businessSelect = document.createElement('select');
    businessSelect.style.cssText = `
        width: 100%;
        margin-bottom: 4px;
        padding: 4px;
        border: none;
        border-radius: 4px;
        background: rgba(255, 255, 255, 0.95);
        font-size: 10px;
        font-weight: 600;
        cursor: pointer;
        display: none;
    `;

    // Result div for ID matcher
    const resultDiv = document.createElement('div');
    resultDiv.style.cssText = `
        max-height: 200px;
        overflow-y: auto;
        background: rgba(255, 255, 255, 0.95);
        border-radius: 3px;
        padding: 4px;
        scrollbar-width: thin;
    `;

    // Assemble ID matcher content
    idMatcherContent.appendChild(programSelect);
    idMatcherContent.appendChild(businessSelect);
    idMatcherContent.appendChild(resultDiv);

    // ========== BULK CALCULATOR CONTENT ==========
    const bulkCalcContent = document.createElement('div');
    bulkCalcContent.id = 'bulkCalcContent';
    bulkCalcContent.style.display = 'none';
    bulkCalcContent.innerHTML = `
    <style>
        #bulkDataInput {
            width: 100%;
            height: 140px;
            padding: 10px;
            border: none;
            border-radius: 6px;
            font-size: 13px;
            font-family: monospace;
            resize: vertical;
            margin-bottom: 10px;
            box-sizing: border-box;
        }

        .bulk-button-group {
            display: flex;
            gap: 8px;
            margin-bottom: 12px;
        }

        .bulk-button-group button {
            flex: 1;
            padding: 10px;
            border: none;
            border-radius: 6px;
            color: white;
            font-weight: bold;
            cursor: pointer;
            font-size: 14px;
        }

        #bulkCalcBtn {
            background: #4CAF50;
        }

        #bulkClearBtn {
            background: #f44336;
        }

        .bulk-result-box {
            background: rgba(255,255,255,0.95);
            padding: 12px;
            border-radius: 6px;
            color: #333;
        }

        .bulk-result-row {
            margin-bottom: 8px;
            font-size: 13px;
        }

        .bulk-result-row strong {
            color: #333;
        }

        .bulk-result-value {
            color: #667eea;
            font-weight: bold;
        }

        .bulk-main-result {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .bulk-main-result strong {
            font-size: 14px;
        }

        #bulkResultPercent {
            color: #4CAF50;
            font-weight: bold;
            font-size: 18px;
        }

        #bulkTotalSavings {
            color: #2196F3;
            font-weight: bold;
            font-size: 18px;
        }

        #bulkCopyBtn, #bulkCopyTotalBtn {
            padding: 6px 12px;
            background: #2196F3;
            border: none;
            border-radius: 4px;
            color: white;
            cursor: pointer;
            font-size: 12px;
            font-weight: bold;
        }
    </style>

    <textarea id="bulkDataInput" placeholder="Paste your dashboard data here..."></textarea>
    <div class="bulk-button-group">
        <button id="bulkCalcBtn">Calculate</button>
        <button id="bulkClearBtn">Clear</button>
    </div>
    <div class="bulk-result-box">
        <div class="bulk-result-row">
            <strong>ASINs Found:</strong> <span class="bulk-result-value" id="bulkAsinCount">0</span>
        </div>
        <div class="bulk-main-result">
            <div>
                <strong>Total Savings:</strong> <span id="bulkTotalSavings">—</span>
            </div>
            <button id="bulkCopyTotalBtn">Copy</button>
        </div>
        <div class="bulk-main-result" style="margin-top: 8px;">
            <div>
                <strong>Avg Savings %:</strong> <span id="bulkResultPercent">—</span>
            </div>
            <button id="bulkCopyBtn">Copy</button>
        </div>
    </div>
    `;

    // ========== RESPONSE GENERATOR CONTENT ==========
    const responseGenContent = document.createElement('div');
    responseGenContent.id = 'responseGenContent';
    responseGenContent.style.display = 'none';
    responseGenContent.innerHTML = `
    <style>
        .rg-select, .rg-input {
            width: 100%;
            padding: 6px 8px;
            margin-bottom: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 11px;
            font-family: inherit;
            transition: border-color 0.2s;
            box-sizing: border-box;
        }

        .rg-select:focus, .rg-input:focus {
            outline: none;
            border-color: #667eea;
        }

        .rg-select {
            cursor: pointer;
            background: white;
        }

        .rg-label {
            display: block;
            margin-bottom: 3px;
            font-weight: 600;
            color: #333;
            font-size: 10px;
        }

        .rg-field-group {
            display: none;
            animation: fadeIn 0.3s ease-in;
        }

        .rg-field-group.active {
            display: block;
        }

        #rg-concept-node-fields {
            padding: 0 !important;
        }

        #rg-concept-node-fields .rg-label {
            margin-bottom: 2px !important;
        }

        #rg-concept-node-fields .rg-select {
            margin-bottom: 4px !important;
        }

        #rg-concept-node-fields .rg-info-text {
            margin-top: 2px !important;
            padding: 4px !important;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-5px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .rg-checkbox-group {
            margin: 8px 0;
            padding: 8px;
            background: #f8f9fa;
            border-radius: 4px;
        }

        .rg-checkbox-item {
            display: flex;
            align-items: center;
            margin-bottom: 6px;
        }

        .rg-checkbox-item:last-child {
            margin-bottom: 0;
        }

        .rg-checkbox-item input[type="checkbox"] {
            width: 14px;
            height: 14px;
            margin-right: 6px;
            cursor: pointer;
            flex-shrink: 0;
        }

        .rg-checkbox-item label {
            font-weight: normal;
            cursor: pointer;
            font-size: 11px;
            user-select: none;
        }

        .rg-button {
            width: 100%;
            padding: 7px;
            margin-top: 6px;
            border: none;
            border-radius: 4px;
            font-weight: 600;
            font-size: 11px;
            cursor: pointer;
            transition: all 0.2s;
            font-family: inherit;
        }

        .rg-button-primary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }

        .rg-button-primary:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        .rg-button-secondary {
            background: #f0f0f0;
            color: #333;
        }

        .rg-button-secondary:hover {
            background: #e0e0e0;
        }

        #rg-output {
            display: none;
            margin-top: 10px;
            padding: 8px;
            background: #f8f9fa;
            border-left: 3px solid #667eea;
            border-radius: 4px;
            white-space: pre-wrap;
            font-size: 10px;
            line-height: 1.5;
            color: #333;
            word-wrap: break-word;
            overflow-wrap: break-word;
        }

        .rg-info-text {
            font-size: 9px;
            color: #666;
            margin-top: 4px;
            padding: 6px;
            background: #fff3cd;
            border-radius: 4px;
            line-height: 1.3;
        }
    </style>

    <label class="rg-label">Response Type</label>
    <select id="rg-response-type" class="rg-select">
        <option value="">-- Select Type --</option>
        <option value="concept-node">Concept Node</option>
        <option value="single-program-single-asin">Single Program - Single ASIN</option>
        <option value="single-program-multiple-asin">Single Program - Multiple ASIN</option>
        <option value="multi-program">Multi-Program Recommendation</option>
    </select>

    <div id="rg-concept-node-fields" class="rg-field-group">
        <label class="rg-label">Level</label>
        <select id="rg-cn-level" class="rg-select">
            <option value="customer">Customer Level</option>
            <option value="org">Organization Level</option>
        </select>
        <div class="rg-info-text">
            ℹ️ Select whether the query is for a single customer or the entire organization.
        </div>
    </div>

    <div id="rg-single-single-fields" class="rg-field-group">
        <label class="rg-label">Level</label>
        <select id="rg-ss-level" class="rg-select">
            <option value="customer">Customer</option>
            <option value="organization">Organization</option>
        </select>

        <label class="rg-label">Category</label>
        <input type="text" id="rg-ss-category" class="rg-input" placeholder="e.g., Electronics">

        <label class="rg-label">Units Purchased</label>
        <input type="number" id="rg-ss-units" class="rg-input" placeholder="e.g., 90">

        <label class="rg-label">Time Period (months)</label>
        <input type="number" id="rg-ss-period" class="rg-input" placeholder="e.g., 12">

        <label class="rg-label">Saving Percentage</label>
        <input type="number" id="rg-ss-percentage" class="rg-input" placeholder="e.g., 23">

        <label class="rg-label">Program Type</label>
        <select id="rg-ss-program" class="rg-select">
            <option value="multipacks">Multipacks</option>
            <option value="bbqd">Quantity Discount (BBQD)</option>
            <option value="sns">Subscribe & Save (SnS)</option>
        </select>
    </div>

    <div id="rg-single-multiple-fields" class="rg-field-group">
        <label class="rg-label">Category</label>
        <input type="text" id="rg-sm-category" class="rg-input" placeholder="e.g., Wireless Mice">

        <label class="rg-label">Time Period (months)</label>
        <input type="number" id="rg-sm-period" class="rg-input" placeholder="e.g., 12">

        <label class="rg-label">Average Saving Percentage</label>
        <input type="number" id="rg-sm-percentage" class="rg-input" placeholder="e.g., 15">

        <label class="rg-label">Program Type</label>
        <select id="rg-sm-program" class="rg-select">
            <option value="multipacks">Multipacks</option>
            <option value="bbqd">Quantity Discount (BBQD)</option>
            <option value="sns">Subscribe & Save (SnS)</option>
        </select>
    </div>

    <div id="rg-multi-program-fields" class="rg-field-group">
        <label class="rg-label">Category</label>
        <input type="text" id="rg-mp-category" class="rg-input" placeholder="e.g., Wood Polishes">

        <label class="rg-label">Time Period (months)</label>
        <input type="number" id="rg-mp-period" class="rg-input" placeholder="e.g., 12">

        <label class="rg-label">Available Programs</label>
        <div class="rg-checkbox-group">
            <div class="rg-checkbox-item">
                <input type="checkbox" id="rg-mp-multipacks" value="multipacks">
                <label for="rg-mp-multipacks">BBMP</label>
            </div>
            <div class="rg-checkbox-item">
                <input type="checkbox" id="rg-mp-bbqd" value="bbqd">
                <label for="rg-mp-bbqd">BBQD</label>
            </div>
            <div class="rg-checkbox-item">
                <input type="checkbox" id="rg-mp-sns" value="sns">
                <label for="rg-mp-sns">SNS</label>
            </div>
        </div>
        <div class="rg-info-text">
            ℹ️ Select programs in the order they should appear.
        </div>
    </div>

    <button id="rg-generate-btn" class="rg-button rg-button-primary">Generate Response</button>
    <button id="rg-copy-btn" class="rg-button rg-button-secondary">📋 Copy</button>

    <div id="rg-output"></div>
    `;

    // Add all contents to content container
    contentContainer.appendChild(calculatorContent);
    contentContainer.appendChild(idMatcherContent);
    contentContainer.appendChild(bulkCalcContent);
    contentContainer.appendChild(responseGenContent);

    // Tool selection handler
    toolSelect.addEventListener('change', function() {
        toolSelect.blur();

        // Hide all content
        calculatorContent.style.display = 'none';
        idMatcherContent.style.display = 'none';
        bulkCalcContent.style.display = 'none';
        responseGenContent.style.display = 'none';

        // Show selected content
        if (this.value === 'calculator') {
            calculatorContent.style.display = 'block';
        } else if (this.value === 'idmatcher') {
            idMatcherContent.style.display = 'block';
        } else if (this.value === 'bulkcalc') {
            bulkCalcContent.style.display = 'block';
        } else if (this.value === 'responsegen') {
            responseGenContent.style.display = 'block';
        }
    });

    // Program selection handler
    programSelect.addEventListener('change', function() {
        programSelect.blur();
        businessSelect.innerHTML = '';
        const defaultOption = document.createElement('option');
        defaultOption.text = 'Select Business ID';
        defaultOption.value = '';
        businessSelect.appendChild(defaultOption);

        let database;
        switch(this.value) {
            case 'sns':
                database = snsDatabase;
                break;
            case 'mp':
                database = mpDatabase;
                break;
            case 'bbqd':
                database = bbqdDatabase;
                break;
            default:
                database = {};
        }

        Object.keys(database).forEach(businessId => {
            const option = document.createElement('option');
            option.text = businessId;
            option.value = businessId;
            businessSelect.appendChild(option);
        });

        businessSelect.style.display = this.value ? 'block' : 'none';
        resultDiv.innerHTML = '';
    });

    // Business selection handler
    businessSelect.addEventListener('change', function() {
        businessSelect.blur();

        let selectedBusiness;
        switch(programSelect.value) {
            case 'sns':
                selectedBusiness = snsDatabase[this.value];
                break;
            case 'mp':
                selectedBusiness = mpDatabase[this.value];
                break;
            case 'bbqd':
                selectedBusiness = bbqdDatabase[this.value];
                break;
            default:
                selectedBusiness = null;
        }

        if (!this.value) {
            resultDiv.innerHTML = '';
            return;
        }

        if (selectedBusiness) {
            resultDiv.innerHTML = '';

            // Business ID Header
            const businessHeader = document.createElement('div');
            businessHeader.innerHTML = '🏢 Business ID';
            businessHeader.style.cssText = 'font-size: 9px; margin: 2px 0 1px 0; font-weight: bold; color: #333;';
            resultDiv.appendChild(businessHeader);

            // Display business ID
            const businessRow = document.createElement('div');
            businessRow.style.cssText = `
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 2px;
                background: #667eea;
                border-radius: 2px;
                margin-bottom: 3px;
            `;
            const businessSpan = document.createElement('span');
            businessSpan.textContent = this.value;
            businessSpan.style.cssText = 'font-family: monospace; color: white; font-size: 13px; font-weight: 800;';
            businessRow.appendChild(businessSpan);
            businessRow.appendChild(createCopyButton(this.value));
            resultDiv.appendChild(businessRow);

            // Display industry type (for MP and BBQD)
            if ((programSelect.value === 'mp' || programSelect.value === 'bbqd') && selectedBusiness.industry) {
                const industryHeader = document.createElement('div');
                industryHeader.innerHTML = '🏭 Industry Type';
                industryHeader.style.cssText = 'font-size: 9px; margin: 2px 0 1px 0; font-weight: bold; color: #333;';
                resultDiv.appendChild(industryHeader);

                const industryRow = document.createElement('div');
                industryRow.style.cssText = `
                    padding: 3px 4px;
                    background: #e8f5e8;
                    border-radius: 2px;
                    margin-bottom: 3px;
                `;
                const industrySpan = document.createElement('span');
                industrySpan.textContent = selectedBusiness.industry;
                industrySpan.style.cssText = 'font-size: 12px; color: #2e7d32; font-weight: 700;';
                industryRow.appendChild(industrySpan);
                resultDiv.appendChild(industryRow);
            }

            // Display customers
            if (selectedBusiness.customers && selectedBusiness.customers.length > 0) {
                const customerHeader = document.createElement('div');
                customerHeader.innerHTML = '👥 Customers';
                customerHeader.style.cssText = 'font-size: 9px; margin: 2px 0 1px 0; font-weight: bold; color: #333;';
                resultDiv.appendChild(customerHeader);

                selectedBusiness.customers.forEach((customerId, i) => {
                    const row = document.createElement('div');
                    row.style.cssText = `
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 3px 4px;
                        background: ${i % 2 === 0 ? '#f0f8ff' : '#e6f3ff'};
                        margin-bottom: 2px;
                        border-radius: 2px;
                    `;
                    const span = document.createElement('span');
                    span.textContent = customerId;
                    span.style.cssText = 'font-family: monospace; font-size: 12px; color: #333; font-weight: 700;';
                    row.appendChild(span);
                    row.appendChild(createCopyButton(customerId));
                    resultDiv.appendChild(row);
                });
            }

            // Display groups
            if (selectedBusiness.groups && selectedBusiness.groups.length > 0) {
                const groupHeader = document.createElement('div');
                groupHeader.innerHTML = '🔗 Groups';
                groupHeader.style.cssText = 'font-size: 9px; margin: 2px 0 1px 0; font-weight: bold; color: #333;';
                resultDiv.appendChild(groupHeader);

                selectedBusiness.groups.forEach((groupId, i) => {
                    const row = document.createElement('div');
                    row.style.cssText = `
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 1px 2px;
                        background: ${i % 2 === 0 ? '#fff8e1' : '#fff3c4'};
                        margin-bottom: 1px;
                        border-radius: 1px;
                    `;
                    const span = document.createElement('span');
                    span.textContent = groupId;
                    span.style.cssText = 'font-family: monospace; font-size: 12px; color: #333; font-weight: 700;';
                    row.appendChild(span);
                    row.appendChild(createCopyButton(groupId));
                    resultDiv.appendChild(row);
                });
            }
        }
    });

    // ========== BULK CALCULATOR LOGIC ==========
    function processBulkData(text) {
        console.log("=== Processing Bulk Data ===");
        console.log("RAW INPUT:\n", text);

        let totalPurchaseAmount = 0;
        let totalSavingsAmount = 0;
        let asinCount = 0;

        const sections = text.split(/(?=B[0-9A-Z]{8,9})/);
        console.log("Sections found after split:", sections.length);

        sections.forEach((section, idx) => {
            const sectionText = section.trim();
            if (sectionText.length < 20) {
                console.log(`--- Skipping Section ${idx + 1} (too short) ---`);
                return;
            }

            console.log(`\n--- Processing Section ${idx + 1} ---`);
            console.log("SECTION TEXT:\n", sectionText);

            let purchaseTotal = 0;
            let savingsAmount = 0;
            let format = "Unknown";

            if (sectionText.includes("Quantity Discount Pricing")) {
                format = "BBQD";
                let quantityDiscountedCost = 0;

                const purchaseMatch = sectionText.match(/\$\s*([0-9,]+\.[0-9]{2})\s*\n\s*💵\s*Actual Purchase Cost/);
                const bbqdSaveMatch = sectionText.match(/\$\s*([0-9,]+\.[0-9]{2})\s*\n\s*💰\s*Saving Amount/);
                const quantityDiscountedMatch = sectionText.match(/\$\s*([0-9,]+\.[0-9]{2})\s*\n\s*💰\s*Quantity Discounted Cost/);

                console.log("BBQD Purchase Match:", purchaseMatch);
                console.log("BBQD Quantity Discounted Match:", quantityDiscountedMatch);
                console.log("BBQD Savings Match:", bbqdSaveMatch);

                if (purchaseMatch) {
                    purchaseTotal = parseFloat(purchaseMatch[1].replace(/,/g, ''));
                } else {
                    if (quantityDiscountedMatch) {
                        quantityDiscountedCost = parseFloat(quantityDiscountedMatch[1].replace(/,/g, ''));
                    }
                }

                if (bbqdSaveMatch) {
                    savingsAmount = parseFloat(bbqdSaveMatch[1].replace(/,/g, ''));
                }

                if (purchaseTotal === 0 && quantityDiscountedCost > 0 && savingsAmount > 0) {
                    purchaseTotal = quantityDiscountedCost + savingsAmount;
                    console.log("✓ Calculated Purchase Total from Discounted Cost + Savings.");
                }

            } else if (sectionText.includes("Subscribe & Save")) {
                format = "SNS";
                const snsTotalMatch = sectionText.match(/Current One-Time Purchases[\s\S]*?📊\s*Total:\s*\$([0-9,]+\.[0-9]{2})/);
                const snsSaveMatch = sectionText.match(/^\s*\$([0-9,]+\.[0-9]{2})\s*\n\s*💰\s*SNS\s*Savings/m);
                console.log("SNS Total Match:", snsTotalMatch);
                console.log("SNS Savings Match:", snsSaveMatch);
                if (snsTotalMatch && snsSaveMatch) {
                    purchaseTotal = parseFloat(snsTotalMatch[1].replace(/,/g, ''));
                    savingsAmount = parseFloat(snsSaveMatch[1].replace(/,/g, ''));
                }
            } else {
                format = "BBMP";
                const saveMatch = sectionText.match(/Save\s*\$([0-9,]+\.[0-9]{2})/);
                const percentMatch = sectionText.match(/Save\s*\$[0-9,]+\.[0-9]{2}\s*\(([\d.]+)%\)/);
                console.log("BBMP Save Match:", saveMatch);
                console.log("BBMP Percent Match:", percentMatch);
                if (saveMatch && percentMatch) {
                    savingsAmount = parseFloat(saveMatch[1].replace(/,/g, ''));
                    const savingsPercent = parseFloat(percentMatch[1]);
                    purchaseTotal = savingsAmount / (savingsPercent / 100);
                } else {
                    const allTotals = [...sectionText.matchAll(/📊\s*Total:\s*\$([0-9,]+\.[0-9]{2})/g)];
                    console.log("BBMP Fallback Totals Match:", allTotals);
                    if (allTotals.length >= 2) {
                        purchaseTotal = parseFloat(allTotals[0][1].replace(/,/g, ''));
                        const discountedTotal = parseFloat(allTotals[1][1].replace(/,/g, ''));
                        savingsAmount = purchaseTotal - discountedTotal;
                    }
                }
            }

            console.log(`Format: ${format}, Purchase Total: ${purchaseTotal}, Savings Amount: ${savingsAmount}`);

            if (purchaseTotal > 0 && savingsAmount > 0) {
                totalPurchaseAmount += purchaseTotal;
                totalSavingsAmount += savingsAmount;
                asinCount++;
                console.log(`✓ Section ${idx + 1} successfully added to totals.`);
            } else {
                console.warn(`✗ Section ${idx + 1} could not be processed. Purchase: ${purchaseTotal}, Savings: ${savingsAmount}`);
            }
        });

        if (asinCount > 0) {
            const avgPercent = (totalSavingsAmount / totalPurchaseAmount * 100).toFixed(2);
            document.getElementById('bulkAsinCount').textContent = asinCount;
            document.getElementById('bulkTotalSavings').textContent = '$' + totalSavingsAmount.toFixed(2);
            document.getElementById('bulkResultPercent').textContent = avgPercent + '%';
            console.log("\n✅ FINAL SUCCESS!");
            console.log("Total Purchase Amount: $" + totalPurchaseAmount.toFixed(2));
            console.log("Total Savings Amount: $" + totalSavingsAmount.toFixed(2));
            console.log("Average Savings %:", avgPercent + '%');
        } else {
            document.getElementById('bulkAsinCount').textContent = '0';
            document.getElementById('bulkTotalSavings').textContent = '—';
            document.getElementById('bulkResultPercent').textContent = '—';
            console.error("❌ FINAL FAILURE: No valid data found after processing all sections.");
            alert('❌ No valid data found!\n\nPlease open the browser console (F12), copy the FULL log, and send it for help.');
        }
    }

    // Calculator input validation - only apply to calculator inputs
    contentContainer.addEventListener('input', (e) => {
        // Only apply numeric validation to calculator inputs
        if (e.target.matches('input') && e.target.closest('#calculatorContent')) {
            e.target.value = e.target.value.replace(/[^\d.\s]/g, '');
        }
    });

    // Savings calculator functions
    function updateSavingsItemCount() {
        const savingsInputs = document.getElementById('savingsInputs');
        if (savingsInputs) {
            document.getElementById('savingsItemCount').textContent = savingsInputs.children.length;
        }
    }

    function updateItemCount() {
        const priceInputs = document.getElementById('priceInputs');
        if (priceInputs) {
            document.getElementById('itemCount').textContent = priceInputs.children.length;
        }
    }

    // Toggle functionality for calculator sections
    function toggleCalculatorSection(header, content) {
        if (!content.style.display) {
            content.style.display = 'none';
        }
        const isOpen = content.style.display === 'none';
        content.style.display = isOpen ? 'block' : 'none';
        header.textContent = (isOpen ? '▲' : '▼') + header.textContent.slice(1);
    }

    // Toggle functionality - Minimize/Expand
    let isMinimized = false;
    let savedHeight = null;

    toggleButton.onclick = () => {
        if (isMinimized) {
            toolSelect.style.display = 'block';
            contentContainer.style.display = 'block';
            toggleButton.innerHTML = '−';
            if (savedHeight) {
                floatingBar.style.height = savedHeight;
            } else {
                floatingBar.style.height = 'auto';
            }
        } else {
            savedHeight = floatingBar.style.height || getComputedStyle(floatingBar).height;
            toolSelect.style.display = 'none';
            contentContainer.style.display = 'none';
            toggleButton.innerHTML = '+';
            floatingBar.style.height = '24px';
        }
        isMinimized = !isMinimized;
    };

    // Create custom resize handle
    const resizeHandle = document.createElement('div');
    resizeHandle.style.cssText = `
        position: absolute !important;
        bottom: 0 !important;
        right: 0 !important;
        width: 12px !important;
        height: 12px !important;
        cursor: nwse-resize !important;
        background: linear-gradient(135deg, transparent 50%, rgba(255,255,255,0.4) 50%) !important;
        border-bottom-right-radius: 6px !important;
        z-index: 10 !important;
    `;

    floatingBar.appendChild(resizeHandle);

    // Dragging and resizing functionality
    let isDragging = false, isResizing = false, startX, startY;
    let startWidth, startHeight, startResizeX, startResizeY;

    titleDiv.onmousedown = (e) => {
        isDragging = true;
        startX = e.clientX - floatingBar.offsetLeft;
        startY = e.clientY - floatingBar.offsetTop;
    };

    resizeHandle.onmousedown = (e) => {
        e.stopPropagation();
        isResizing = true;
        startWidth = floatingBar.offsetWidth;
        startHeight = floatingBar.offsetHeight;
        startResizeX = e.clientX;
        startResizeY = e.clientY;
        document.body.style.cursor = 'nwse-resize';
        e.preventDefault();
    };

    document.onmousemove = (e) => {
        if (isDragging) {
            floatingBar.style.left = (e.clientX - startX) + 'px';
            floatingBar.style.top = (e.clientY - startY) + 'px';
            floatingBar.style.right = 'auto';
            floatingBar.style.transform = 'none';
        } else if (isResizing) {
            const newWidth = startWidth + (e.clientX - startResizeX);
            const newHeight = startHeight + (e.clientY - startResizeY);
            floatingBar.style.width = Math.max(220, Math.min(600, newWidth)) + 'px';
            floatingBar.style.height = Math.max(100, Math.min(window.innerHeight * 0.9, newHeight)) + 'px';
        }
    };

    document.onmouseup = () => {
        isDragging = false;
        if (isResizing) {
            isResizing = false;
            document.body.style.cursor = '';
        }
    };

    // Assemble and add to page
    floatingBar.appendChild(toggleButton);
    floatingBar.appendChild(titleDiv);
    floatingBar.appendChild(toolSelect);
    floatingBar.appendChild(contentContainer);
    document.body.appendChild(floatingBar);

    // Set up event listeners after DOM is ready
    setTimeout(() => {
        // Calculator toggle handlers
        const savingsHeader = document.getElementById('savingsPercentageHeader');
        const savingsContent = document.getElementById('savingsPercentageContent');
        const priceHeader = document.getElementById('priceTotalHeader');
        const priceContent = document.getElementById('priceTotalContent');

        if (savingsHeader && savingsContent) {
            savingsHeader.addEventListener('click', () => toggleCalculatorSection(savingsHeader, savingsContent));
        }

        if (priceHeader && priceContent) {
            priceHeader.addEventListener('click', () => toggleCalculatorSection(priceHeader, priceContent));
        }

        // Savings calculator handlers
        const addSavingsBtn = document.getElementById('addSavingsField');
        const removeSavingsBtn = document.getElementById('removeSavingsField');
        const calcBtn = document.getElementById('calcBtn');
        const resetSavingsBtn = document.getElementById('resetSavings');

        if (addSavingsBtn) {
            addSavingsBtn.onclick = () => {
                const savingsInputs = document.getElementById('savingsInputs');
                const rowCount = savingsInputs.children.length + 1;
                const row = document.createElement('div');
                row.className = 'savings-row';
                row.innerHTML = `
                    <input type="text" class="priceInput" placeholder="Price ${rowCount}" style="padding: 1.0em; border: 1px solid #ccc; border-radius: 0.25em; font-size: 1.4em; font-weight: 600; flex: 1;">
                    <input type="text" class="saveInput" placeholder="Save ${rowCount}" style="padding: 1.0em; border: 1px solid #ccc; border-radius: 0.25em; font-size: 1.4em; font-weight: 600; flex: 1;">
                `;
                savingsInputs.appendChild(row);
                updateSavingsItemCount();
            };
        }

        if (removeSavingsBtn) {
            removeSavingsBtn.onclick = () => {
                const savingsInputs = document.getElementById('savingsInputs');
                if (savingsInputs.children.length > 2) {
                    savingsInputs.removeChild(savingsInputs.lastChild);
                    updateSavingsItemCount();
                }
            };
        }

        if (calcBtn) {
            calcBtn.onclick = () => {
                const rows = document.getElementsByClassName('savings-row');
                let totalPrice = 0, totalSavings = 0;
                for (let row of rows) {
                    totalPrice += cleanNumberInput(row.querySelector('.priceInput').value);
                    totalSavings += cleanNumberInput(row.querySelector('.saveInput').value);
                }
                if (totalPrice > 0) {
                    const percent = (totalSavings / totalPrice) * 100;
                    document.getElementById('savingsResult').textContent = `Savings: ${percent.toFixed(2)}%`;
                } else {
                    document.getElementById('savingsResult').textContent = '';
                }
            };
        }

        if (resetSavingsBtn) {
            resetSavingsBtn.onclick = () => {
                const savingsInputs = document.getElementById('savingsInputs');
                while (savingsInputs.children.length > 2) savingsInputs.removeChild(savingsInputs.lastChild);
                [...savingsInputs.getElementsByTagName('input')].forEach(input => input.value = '');
                document.getElementById('savingsResult').textContent = '';
                updateSavingsItemCount();
            };
        }

        // Price calculator handlers
        const addPriceBtn = document.getElementById('addPriceField');
        const removePriceBtn = document.getElementById('removePriceField');
        const calculateTotalBtn = document.getElementById('calculateTotal');
        const resetTotalBtn = document.getElementById('resetTotal');

        if (addPriceBtn) {
            addPriceBtn.onclick = () => {
                const priceInputs = document.getElementById('priceInputs');
                const input = document.createElement('input');
                input.type = 'text';
                input.className = 'priceInput';
                input.placeholder = 'Enter price';
                input.style.cssText = 'width: 100%; margin-bottom: 0.5em; padding: 1.0em; border: 1px solid #ccc; border-radius: 0.25em; font-size: 16px; font-weight: 700;';
                priceInputs.appendChild(input);
                updateItemCount();
            };
        }

        if (removePriceBtn) {
            removePriceBtn.onclick = () => {
                const priceInputs = document.getElementById('priceInputs');
                if (priceInputs.children.length > 1) {
                    priceInputs.removeChild(priceInputs.lastChild);
                    updateItemCount();
                }
            };
        }

        if (calculateTotalBtn) {
            calculateTotalBtn.onclick = () => {
                let total = 0;
                document.querySelectorAll('#priceInputs .priceInput').forEach(input => {
                    total += cleanNumberInput(input.value);
                });
                document.getElementById('priceTotal').textContent = total.toFixed(2);
            };
        }

        if (resetTotalBtn) {
            resetTotalBtn.onclick = () => {
                const priceInputs = document.getElementById('priceInputs');
                while (priceInputs.children.length > 1) priceInputs.removeChild(priceInputs.lastChild);
                priceInputs.children[0].value = '';
                document.getElementById('priceTotal').textContent = '0.00';
                updateItemCount();
            };
        }

        // Bulk calculator handlers
        const bulkCalcBtn = document.getElementById('bulkCalcBtn');
        const bulkClearBtn = document.getElementById('bulkClearBtn');
        const bulkCopyBtn = document.getElementById('bulkCopyBtn');
        const bulkCopyTotalBtn = document.getElementById('bulkCopyTotalBtn');

        if (bulkCalcBtn) {
            bulkCalcBtn.onclick = () => {
                const input = document.getElementById('bulkDataInput').value;
                if (!input.trim()) {
                    alert('Please paste data first!');
                    return;
                }
                console.clear();
                processBulkData(input);
            };
        }

        if (bulkClearBtn) {
            bulkClearBtn.onclick = () => {
                document.getElementById('bulkDataInput').value = '';
                document.getElementById('bulkAsinCount').textContent = '0';
                document.getElementById('bulkTotalSavings').textContent = '—';
                document.getElementById('bulkResultPercent').textContent = '—';
            };
        }

        if (bulkCopyBtn) {
            bulkCopyBtn.onclick = () => {
                const result = document.getElementById('bulkResultPercent').textContent;
                if (result !== '—') {
                    copyToClipboard(result, bulkCopyBtn);
                }
            };
        }

        if (bulkCopyTotalBtn) {
            bulkCopyTotalBtn.onclick = () => {
                const result = document.getElementById('bulkTotalSavings').textContent;
                if (result !== '—') {
                    copyToClipboard(result, bulkCopyTotalBtn);
                }
            };
        }

        // ========== RESPONSE GENERATOR HANDLERS ==========
        const rgResponseType = document.getElementById('rg-response-type');
        const rgGenerateBtn = document.getElementById('rg-generate-btn');
        const rgCopyBtn = document.getElementById('rg-copy-btn');
        const rgOutput = document.getElementById('rg-output');

        // Response type change handler
        if (rgResponseType) {
            rgResponseType.addEventListener('change', (e) => {
                document.querySelectorAll('.rg-field-group').forEach(group => {
                    group.classList.remove('active');
                });

                const type = e.target.value;
                const fieldMap = {
                    'concept-node': 'rg-concept-node-fields',
                    'single-program-single-asin': 'rg-single-single-fields',
                    'single-program-multiple-asin': 'rg-single-multiple-fields',
                    'multi-program': 'rg-multi-program-fields'
                };

                if (fieldMap[type]) {
                    document.getElementById(fieldMap[type]).classList.add('active');
                }

                if (rgOutput) rgOutput.style.display = 'none';
            });
        }

        // Generate response handler
        if (rgGenerateBtn) {
            rgGenerateBtn.addEventListener('click', () => {
                const type = rgResponseType.value;
                let response = '';

                if (!type) {
                    alert('⚠️ Please select a response type');
                    return;
                }

                try {
                    if (type === 'concept-node') {
                        const level = document.getElementById('rg-cn-level').value;
                        if (level === 'customer') {
                            response = "Based on your purchase history, I've found some key cost-saving opportunities in these categories. Which category interests you the most?";
                        } else {
                            response = "Based on your organization's purchase history, I've found some key cost-saving opportunities in these categories. Which category interests you the most?";
                        }
                    }
                    else if (type === 'single-program-single-asin') {
                        const level = document.getElementById('rg-ss-level').value;
                        const category = document.getElementById('rg-ss-category').value.trim();
                        const units = document.getElementById('rg-ss-units').value.trim();
                        const period = document.getElementById('rg-ss-period').value.trim();
                        const percentage = document.getElementById('rg-ss-percentage').value.trim();
                        const program = document.getElementById('rg-ss-program').value;

                        if (!category || !units || !period || !percentage) {
                            alert('⚠️ Please fill in all required fields');
                            return;
                        }

                        if (level === 'customer') {
                            if (program === 'multipacks') {
                                response = `OK, let's focus on ${category}. It looks like you purchased ${units} single units of this item over the past ${period} months. Buying multipacks could save you about ${percentage}%.`;
                            }
                            else if (program === 'bbqd') {
                                response = `OK, let's focus on ${category}. It looks like you purchased ${units} units of this item over the past ${period} months. Buying a similar quantity in a single order unlocks a ${percentage}% quantity discount.`;
                            }
                            else if (program === 'sns') {
                                response = `OK, let's focus on ${category}. It looks like you purchased ${units} units of this item over the past ${period} months. Subscribe & Save could save you ${percentage}% now and on repeat deliveries.`;
                            }
                        } else { // organization
                            if (program === 'multipacks') {
                                response = `OK, let's focus on ${category}. Over the past ${period} months, your organization purchased ${units} single units of this item. Buying multipacks could save you about ${percentage}%.`;
                            }
                            else if (program === 'bbqd') {
                                response = `OK, let's focus on ${category}. Over the past ${period} months your organization purchased ${units} units of this item. Buying a similar quantity in a single order unlocks a ${percentage}% quantity discount.`;
                            }
                            else if (program === 'sns') {
                                response = `OK, let's focus on ${category}. Over the past ${period} months your organization purchased ${units} units of this item. Subscribe & Save could save you ${percentage}% now and on repeat deliveries.`;
                            }
                        }
                    }
                    else if (type === 'single-program-multiple-asin') {
                        const category = document.getElementById('rg-sm-category').value.trim();
                        const period = document.getElementById('rg-sm-period').value.trim();
                        const percentage = document.getElementById('rg-sm-percentage').value.trim();
                        const program = document.getElementById('rg-sm-program').value;

                        if (!category || !period || !percentage) {
                            alert('⚠️ Please fill in all required fields');
                            return;
                        }

                        const actionMap = {
                            'multipacks': 'purchasing multipacks over single units',
                            'bbqd': 'buying in bulk to unlock quantity discounts',
                            'sns': 'setting up Subscribe & Save for repeat orders'
                        };

                        response = `OK, let's focus on ${category}. Based on the past ${period} months, it looks like you could save up to ${percentage}% just by ${actionMap[program]}.`;
                    }
                    else if (type === 'multi-program') {
                        const category = document.getElementById('rg-mp-category').value.trim();
                        const period = document.getElementById('rg-mp-period').value.trim();
                        const hasMultipacks = document.getElementById('rg-mp-multipacks').checked;
                        const hasBBQD = document.getElementById('rg-mp-bbqd').checked;
                        const hasSNS = document.getElementById('rg-mp-sns').checked;

                        if (!category || !period) {
                            alert('⚠️ Please fill in required fields');
                            return;
                        }

                        if (!hasMultipacks && !hasBBQD && !hasSNS) {
                            alert('⚠️ Please select at least one program');
                            return;
                        }

                        response = `OK, let's focus on ${category}. Based on the past ${period} months, I've found some opportunities to reduce costs:\n`;

                        if (hasMultipacks) response += '• Purchase multipacks over single units\n';
                        if (hasBBQD) response += '• Buy in bulk to unlock quantity discounts\n';
                        if (hasSNS) response += '• Subscribe to save on repeat orders';
                    }

                    rgOutput.textContent = response;
                    rgOutput.style.display = 'block';
                    rgOutput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

                } catch (error) {
                    alert('❌ Error generating response. Please check your inputs.');
                    console.error(error);
                }
            });
        }

        // Copy response handler
        if (rgCopyBtn) {
            rgCopyBtn.addEventListener('click', () => {
                const text = rgOutput.textContent;
                if (!text) {
                    alert('⚠️ Generate a response first!');
                    return;
                }

                navigator.clipboard.writeText(text).then(() => {
                    const originalText = rgCopyBtn.textContent;
                    rgCopyBtn.textContent = '✅ Copied!';
                    rgCopyBtn.style.background = '#4CAF50';
                    rgCopyBtn.style.color = 'white';
                    setTimeout(() => {
                        rgCopyBtn.textContent = originalText;
                        rgCopyBtn.style.background = '';
                        rgCopyBtn.style.color = '';
                    }, 2000);
                }).catch(() => {
                    alert('❌ Failed to copy. Please copy manually.');
                });
            });
        }
    }, 100);

    // Resize-based scaling
    const baseWidth = 250;
    let currentScale = 1;

    const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            const width = entry.contentRect.width;
            currentScale = Math.max(0.7, Math.min(1.8, width / baseWidth));

            if (calculatorContent.style.display !== 'none') {
                applyCalcScaling(currentScale);
            }

            if (idMatcherContent.style.display !== 'none') {
                applyIdMatcherScaling(currentScale);
            }

            if (bulkCalcContent.style.display !== 'none') {
                applyBulkCalcScaling(currentScale);
            }

            if (responseGenContent.style.display !== 'none') {
                applyResponseGenScaling(currentScale);
            }
        }
    });

    // Calculator scaling function
    function applyCalcScaling(scale) {
        calculatorContent.style.fontSize = `${scale * 10}px`;

        const inputs = calculatorContent.querySelectorAll('input');
        inputs.forEach(input => {
            input.style.fontSize = `${scale * 10}px`;
            input.style.padding = `${scale * 4}px`;
        });

        const buttons = calculatorContent.querySelectorAll('button');
        buttons.forEach(button => {
            button.style.fontSize = `${scale * 9}px`;
            button.style.padding = `${scale * 3}px`;
        });

        const headers = calculatorContent.querySelectorAll('.calc-header');
        headers.forEach(header => {
            header.style.fontSize = `${scale * 11}px`;
            header.style.padding = `${scale * 4}px`;
        });

        const infoTexts = calculatorContent.querySelectorAll('.calc-info-text');
        infoTexts.forEach(text => {
            text.style.fontSize = `${scale * 9}px`;
        });

        const labels = calculatorContent.querySelectorAll('.header-labels');
        labels.forEach(label => {
            label.style.fontSize = `${scale * 9}px`;
        });
    }

    // ID Matcher scaling function
    function applyIdMatcherScaling(scale) {
        programSelect.style.fontSize = `${scale * 10}px`;
        programSelect.style.padding = `${scale * 4}px`;
        businessSelect.style.fontSize = `${scale * 10}px`;
        businessSelect.style.padding = `${scale * 4}px`;
        resultDiv.style.fontSize = `${scale * 10}px`;

        const headers = resultDiv.querySelectorAll('div[style*="font-size: 9px"]');
        headers.forEach(header => {
            header.style.fontSize = `${scale * 9}px`;
            header.style.margin = `${scale * 2}px 0 ${scale}px 0`;
        });

        const businessSpans = resultDiv.querySelectorAll('span[style*="font-size: 13px"]');
        businessSpans.forEach(span => {
            span.style.fontSize = `${scale * 13}px`;
        });

        const industrySpans = resultDiv.querySelectorAll('span[style*="font-size: 12px"]');
        industrySpans.forEach(span => {
            span.style.fontSize = `${scale * 12}px`;
        });

        const copyButtons = resultDiv.querySelectorAll('button');
        copyButtons.forEach(button => {
            button.style.fontSize = `${scale * 9}px`;
            button.style.padding = `${scale * 2}px ${scale * 4}px`;
        });
    }

    // Bulk Calculator scaling function
    function applyBulkCalcScaling(scale) {
        const textarea = document.getElementById('bulkDataInput');
        if (textarea) {
            textarea.style.fontSize = `${scale * 13}px`;
            textarea.style.padding = `${scale * 10}px`;
        }

        const buttons = bulkCalcContent.querySelectorAll('button');
        buttons.forEach(button => {
            button.style.fontSize = `${scale * 14}px`;
            button.style.padding = `${scale * 10}px`;
        });

        const resultBox = bulkCalcContent.querySelector('.bulk-result-box');
        if (resultBox) {
            resultBox.style.padding = `${scale * 12}px`;
        }

        const resultRows = bulkCalcContent.querySelectorAll('.bulk-result-row');
        resultRows.forEach(row => {
            row.style.fontSize = `${scale * 13}px`;
        });

        const resultPercent = document.getElementById('bulkResultPercent');
        if (resultPercent) {
            resultPercent.style.fontSize = `${scale * 18}px`;
        }

        const totalSavings = document.getElementById('bulkTotalSavings');
        if (totalSavings) {
            totalSavings.style.fontSize = `${scale * 18}px`;
        }
    }

    // Response Generator scaling function
    function applyResponseGenScaling(scale) {
        responseGenContent.style.fontSize = `${scale * 11}px`;

        const inputs = responseGenContent.querySelectorAll('.rg-input, .rg-select');
        inputs.forEach(input => {
            input.style.fontSize = `${scale * 11}px`;
            input.style.padding = `${scale * 6}px ${scale * 8}px`;
            input.style.marginBottom = `${scale * 8}px`;
        });

        const labels = responseGenContent.querySelectorAll('.rg-label');
        labels.forEach(label => {
            label.style.fontSize = `${scale * 10}px`;
            label.style.marginBottom = `${scale * 3}px`;
        });

        const buttons = responseGenContent.querySelectorAll('.rg-button');
        buttons.forEach(button => {
            button.style.fontSize = `${scale * 11}px`;
            button.style.padding = `${scale * 7}px`;
            button.style.marginTop = `${scale * 6}px`;
        });

        const infoTexts = responseGenContent.querySelectorAll('.rg-info-text');
        infoTexts.forEach(text => {
            text.style.fontSize = `${scale * 9}px`;
            text.style.padding = `${scale * 6}px`;
            text.style.marginTop = `${scale * 4}px`;
        });

        const rgOutput = document.getElementById('rg-output');
        if (rgOutput) {
            rgOutput.style.fontSize = `${scale * 10}px`;
            rgOutput.style.padding = `${scale * 8}px`;
            rgOutput.style.marginTop = `${scale * 10}px`;
        }

        const checkboxItems = responseGenContent.querySelectorAll('.rg-checkbox-item');
        checkboxItems.forEach(item => {
            item.style.marginBottom = `${scale * 6}px`;
            const checkbox = item.querySelector('input[type="checkbox"]');
            if (checkbox) {
                checkbox.style.width = `${scale * 14}px`;
                checkbox.style.height = `${scale * 14}px`;
                checkbox.style.marginRight = `${scale * 6}px`;
            }
            const label = item.querySelector('label');
            if (label) {
                label.style.fontSize = `${scale * 11}px`;
            }
        });

        const checkboxGroups = responseGenContent.querySelectorAll('.rg-checkbox-group');
        checkboxGroups.forEach(group => {
            group.style.margin = `${scale * 8}px 0`;
            group.style.padding = `${scale * 8}px`;
        });
    }

    resizeObserver.observe(floatingBar);

    console.log('✓ Combined Floating Bar v3.0 with Response Generator loaded!');

})();