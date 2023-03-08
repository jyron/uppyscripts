import { Uppy, FileInput, StatusBar, AwsS3 } from "https://releases.transloadit.com/uppy/v3.3.1/uppy.min.mjs"
const videoFileTypes = ['.mp4', '.mov', '.qt', '.m4v', '.mpg', '.mpeg', '.mp2', '.avi', '.3gp', '.3g2', '.mkv', '.webm', '.wmv']      
 const uppy = new Uppy({
    restrictions: {
        maxNumberOfFiles: 1,
    }                                                                   
})

    .use(FileInput, {
        target: '.uppyinput',
        locale: {
            strings: {
                chooseFiles: 'UPLOAD VIDEO'
            }
        }
    })
    .use(StatusBar, {
        target: '.uppyinput-progress',
        hideUploadButton: true,
        hideAfterFinish: false,
    })
    .use(AwsS3, {
        getUploadParameters (file) {
            let url = 'https://mobile-api.hopper.com/api/v2/video/storage/upload/signed' // the environment will need to be passed as a parameter

            let email = document.getElementById('email').value                     
            let instagramHandle = document.getElementById('instagram_handle').value      
            let tiktokHandle = document.getElementById('tiktok_username').value          
            let destination = document.getElementById('travel_destination').value  
            let hotel = document.getElementById('hotel_name').value
            let rating = document.getElementById('rating').value 


            // validateFields();

            let requestBody = {
                fileName: file.name,
                emailAddress: email,
                fileSize: file.size
            }

             if (instagramHandle.length > 0) {                   
                 requestBody.instagramUsername = instagramHandle 
             }                                             

             if (tiktokHandle.length > 0) {                      
                 requestBody.tiktokUsername = tiktokHandle       
             }                                             

             if (destination.length > 0) {                 
                 requestBody.destinationTag = destination  
             }                                             

             if (hotel.length > 0) {                       
                 requestBody.hotelTag = hotel              
             }
             if (rating) {                       
                requestBody.rating = parseInt(rating)             
            }                                                

            return fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'H-Request' : 'H4sIACS0UWMAA527167kypIl+C/5yntOUosD9AM1GVQR1IzZgwK11pqF+vf2vDU1z41O7ETucHe6Bd3MlkiQ//lrjY88U7e8X3/98//85691i7f81z//+WuLy3//U/c5GOunX//8QmEU/Qsm/0IoF8H+wah/YPRvggBD4Df413/965fzP3s5/73LL2NcNztP82H7M/3/hwIzdl7W47CC4f+DmAj8F4y7MPEPiv4Dk38zJPN/FZOPl6XOl/+joMhfMP0XCrsw/M+/f/6GYfj/KqiQF/HebXo9tCDw//uvX3UGVtXb/SdoPE1qBhalY/93NU5TvvxddHVZbeuvf/3K8qNO83/P4xjF06IE/0WzBP4XjiHiXyxMin8RGExzLIyzpMCAK/Y1X/69vkBwPGHo/K80Z3KwnoL/ijEM+wsjUIZKGZpC4xysj/etcsc2H8Al+f2C85Ctrfql+cin1vlXlcjpn8+q93iXUb+Yv8Gi5xuaTxwwe4h2rdqMtdF/UCvwcEsotwiNkOiGYSMwe90tYcONNvP51lETwV/XrKwgOtX6rL9hdYJrL7OJUOMpEcNtbxAQ/Yavf+8N5s7i8/f5fuf/8dGqSDu/f8XcoDAaI9dMhNO7RgzkuE2LEbluohMlpcjynJmhkRX71uv1FDEq/PpLmZVCZyhkbGJpZM0t44UT3PgBqgCU358UHHG3/8kg9TeK/g2DuWSvu8zc+yRffv0D/xdIZ36BxIDyGEBa/vml4KvK/s8fzc8CrJgtXYf05y4C53hRGzp8GZKtVHcS5bL8itDPb95fOTd6Oqb2Xu/ggCCynZ3ku5t7hyhzNMjXlmhb2M338fNbTtBnseSm+Pl9DZk830F7SUVGnH6dKI/XQ7SDHuSGmSQHNXP6LF4fN2BtZwZ+Z35fw93OmdsdIv2N/YfFqMGLI6W1mWAKzzC10vi9q19MCcIVw2SPqpaUcKWtd483v7VBanW0u7qyT/kUUp/jyCmUQt3L3ikJUm5zlweIqPc9+aUJqMCLLIRvYxQKksCtANPavXjlofnzm7wf/D2ZVNdgrDNH9IL104ENuogoHEylHcGQj4lCdWAoEJdgkJMlte98jJ/fWJQvHA0/5B5/s/aldDiBIJC1aJRsJ6Jd/fy+iZxzCRRauJyxYgLTCWgb97i7A11gzuL1xQik9t5PRN8X3rb6EofudngVtDuTcgopvXjRhllySWt5ju5k7HF+ij0/v62W0J4aRu372EDeMORBQEYmTiq9w79fxEwnX+45mqFRS156pC9thGG10oXbBN72df0KpvD56o0DQuZgIvA5fHNpFn6PyOww4ku7Gvc9lcolVcLOB4zRD0zQg6b+2v7P71Dz5BhiI/jAJD76+a0TwmNS6iT+/A56nlttMkhYPqT5PAHdCtmL5jHYQLGtVwwrnCNPqHNi6xolGnVHabD0dBfFWY+FJe4vboeHVK3OpYW3EClNtmwdnCToJ6Oln99U05nujfWzNj7u67LMhKUH7iMSyYBxoUkGN+2v2zRlO3HUp5QokWAqI1ftHleT3tSyL7Qjic6jrYK8k8alIAo+7FMbOQR/PaJF0f7L+/lNT0jdvgzVzaFNqfXbdgtP5etauRBGerDm0qGM0Z4qtkwa25Wf39zdZLl0dTr0ipm0GPYkY0gag6f+ubbZ40Jr7NCjDPjta/AZh63auqn3VtCcZNPDsFLnnTKOo59GmTpDh9poIjmrfub7vdnXmSn+BoLIGLxVYwENqknmdghFH255CtNbXxyPTbDr78RXqw9JEd2ddT2+QVC1UFutGPN+dBFD/3TxeCDCN8joXsPm2GzpIvggFj5012Yq1YEkS5siAS13zID4LwCH71cftX59ESqcQVpEKKqA/vxeuw3VqdZAYl6TnLrcUBXhq+nnN1PSJagQr37NcNHnZ9IMusfXSBa70o7Gbcf9/EbS7xXICAmdAEX27zfmetWe0Wah+7Rh8fftIpdxn6tin4yx8OmB6hiiBinvGpPyOBU6ykLjBgTJeRM1jHqQQ2LeTUEYlAqlRmWkN1oI7WvDuuL1TXfngtCyOZ6QpdDdmrqGlLvb/vKGe3pszVQqbJNVZaJ8CfkRRBCdUZhxNpYB+/MbRthAMNMTvmh2v1mXIn5+++AvU8ihyH8YBcVjPCuNmA1p9PVZ7ha2s130R09bu8QDBx0E+ZBm3yXpdD59Mj6L3JZGlSuYNWuPIc5Cy4nVEePhTmQGxSD7sBR2pBA78kbzGv0YJy9oKPsWeXd6b94SqLHoIN03Qutae9Gf/CNEVGF++oRrn2P3vBOC4jM68ClG+g1/1Zzi8RN50vVbAzUIKFkft3gwnOIlCg0jnhh80It2h5obKQY/b5DEhU72uofJcQMu7vgi7rcWQ/JJlgJNCm0R31SiPAoXAx0Qq68d4d+vZnv5UmKUDr3H7XqaTejGxoupY3/GTUAK1tDlfEBmeuNqIckHjSgQPq4ooobC6tdGQTGAcw1mH7FWPv2cqr4Jy9rMJHdtNrvhaiZXkk0l/cluk+3eZFtrn4JZ3GEPpuclqjOy8csrKyy0c/yjGsRpTujQSI271/lvA0tuUC8MsdYtVfUqB3XpWVw2ZDqc12Unt9Pv3q/usf9Sb7Z/8DhefZeFhmJu19X29vG2swvVpqY+BHghGWjRL0yuHGpRf36PdPHYmrEQM8tMCDTwmkhxNLVQuiWwnS59V+QD7yq2zHio5maoBC6T4dqdgRqQgVaB042DE3GzMdWwtAjxMQn5+Z39/I4YtjC1GKFURDJqC5HLpVSK5/MqV7nK+dLETrGY9cVLuK/zjRlAA4BjuZiku1YcEt8yZIb7fBRdiF1cyNvv2J8mUcSs4r9Bzod1dLP1NR82nyx6ynzDsbinxgk/ei/Q8GDxvfumod5+gabX0I3RRJ4+sYqOSw6Eivlif6/i7RsCF+8mPu4AXl5lUPq3UWqnaAlT1oTM+ty8BdDbcfyth13qwXavujxocn9+s/GSHQ/bStTIsVOOhxErZFlBP5bJeCw2WmbDuPOZF4jTDEVHs9Du7wDesJNqFYLlP3a/lnekyqgTTJt/YhTaXnk9N02MfW+3+941xfuKT4ALobSNFPF9L7k0ZYWKLtQnjolQ6dSUuMfRzlKoBQ0LifjHl8RJ6NCbRTXVHL/20XgSlOvzAw/wLXLr1/CP/lEN1a5mDN9CU9K1iASo6T56ZA7tdihMfP8hx4VV95koUrEE1Eku4619CJQgJu4h1gWAuoSIKQVrrxR8dRh85/VDdEQzTRO8fZCR7Ux7s90eikRvmHNVGannMEM5k6NUIi0wTtxnzil6ErPyohNye/RcHu0fw4Wi9q2CtDWeq6fdz2/JKgIXQvUnSN+sT5OkRAwKJfIP4sXT2BbiFE2EOUFcDHOTJNFjv62i+ZGQha5r4SNp1M/vTwj2YQeHupIwiu46654QRcjBT31nqz03D2zlkm3cAyJaOe5uGQUKFLJu+Io7t+U639WwgXMYHiO5UceYEjQVQE2c7VuvjDY2EOx8M4LCYRjLFnO9rErKea/8Yr0/wkPVU7qsVKmSoDSg5wjGP+H1CpSofuKiuGXLAa04dyL0sXY6HvovLsj0IuAaII+qMGGukSr4dV3YRS801C4KQvByEvDo15NZQegeNWUFCOX4TP+uAXuizE25MQdzNSEqQ38oZwdhcEbv3V7BvsPQ8sRE93RoH/36pEC9B7yplY1/RidHUawIgUpnrQEQS2A5h1aViP+Q5onKwmj4JIVJoz4wqgbvipJAH/Yj2a3jOZUCYsn2AzsHuvAEk3B56P7BxmO1TkI58iispGxFKHbHA6fo8gsGvagY3UhxfXdI7ynjAPp9jeu8duhmwqDdcAqPzTIgeEZTOwC1qdaMQ+2P1us9hCvDvqywvcJRHa3pnewOEaG05XsFpItjFtPxopHk1i8aHoAt00L16Zk5LRx++M7ehqdQvbytdxZwSome3jDKXl/4w8CjBF0cUjM5SeAGVZ9KOxXTbMPYsyqZ2b3y748Ph9fn53c3uNCVKVZDA4PwTtXS99gUAaChWEaajOxTeRfQf6+yIcfuMynYkLDBle+1Gk30V0yEAdQHb4Rpz+6y7EoXNx7CSIx8MKOg4PFiiitw4AT+87uIxjLhlRHU5XWKfaWrHtHKHiSivr8wDWcG9LtmgmC93qXhYOarFOyGcBjSNDZu2m51KGF2Czce5awxs7nJPalhOGS/DKrjUstrTLdAGuXVexg91VpeIniE5s0n2I5lEH3p7CrHjgplSIrTSGoKH1oWgvIi83tPyOZ7SCGsRyAJ9moPKw4voa9p9c6SemNItWtUBc/TjKXFIaxDZPzp8dci4gY/8GMlqei38uOhSXn2/JhcM3ImjwrCG/VdxvsYWTYr50BA0ha231S5wk/T2QYPsS+5Dc523GEgP3yueIO2/eZA6Mwv1jqVhXrt5KZ/canlgA7CXU7stYH+aN/Y/pi4pq5AoDaJVZzyabxYLxcDM1UxYhCZl16aIrpYoOq+TgY363sUcEJOfA0ieNETZ7Mf8tuJgJz79O+cGDzzyfHYZw5ScDY16Ifn84U5VP9+ZNaTDrYGhJuabE6jAveS2LiGZszKT8PHQpp2aa8ROUrTa7YWnXYDdtagrw0iBcYyAFukOH59dHPsLPVE35rFV1ESSPbV87mjvkyNrfYpt4CG7bYkK07swEYeDhaeLRaLN84aM/EPSx6CQVdmbMYl0H96DJFOh6ei/racKPgsDx2KyLd72MIRVg6jYfzAxMVCzuNq2XMT9Ua8NXuX9SPRnIXPDhEbvZKmPjKRW5eIvSgZYUSF3E1RrhCbIKiwf5t259iJ8RlmScvLmyDaoS+kvQ+WSVDU56AO9YjXjxHY6hNgbZABQ7ulnpdDlsX4jrof3atcDJBSTqPDLBqcrHYtnylm/rNg8VTNc7jV/J4h996btkz6DD5Dp/OnDmLBw+XtDeS6+T3HdYSfPWvKr+7ouNm92GigHXqRtK+X0zsVrHxycy6nRe+Mn/QgA/ZlPdlEeQUb27OyFVapP9csFJcCz+KriCL598bydMxr85PIDRswW2ocYt+Dhg9Lxpf77opBRnr1wCInAp0c44m7QpWsWzgLT3aYfiLD3gq477DGQr221cb7tcbmwa0d5utTJ/qs3KiO//HgC4turAi/XJr4xQC5qZCSyVlDSb8FZgjxLW0DrD3RR6qLrS6MwWrP9wUEIag6XFAu/ab3Yddym817M76iESj0uSj3dyDEn0hn+TcG1aPD6e2zag7E5Y0yv1P3zaDtiXJL2OTdMzu4xErdRxHPL7hxrw8KAF9hWuFUqJYfaOgwMcJeQjYEIYhrXFQll+wqWOUo+i64f82tzHG+uxlUn7k4ZtNCCu7CGmskAlAPqs0REgmjCOuYmJVGq19FfO2gXUvVkv7uG1bGcX6CXrQqJoYMe40mf9iYgs8VJ6EZjzHZ/GRlbH2BBMPx8PA+V+DKAgkLRj9yba+u+8fsqraKgOuH7iGrEBlgdU/5n1Rf/P1bFvan8cLPW3xTtSAQWx4nrs9KgeLSGTrPmSgJK49HoBxKwRqmjztcY70Qodoy0rVIKufnOybDOWrWGj8JHuI1k2IB+O4ODX5mjdpDgz54S/vUJ4vvvCHI4hogJnnF41WR4Y0zR1v2VXcw9dbJZB0gsv5mkGPYarD3ZeZ6AK1WT7kPb4hYPJ5H3Q/kVyTiS6/qmP42kg3DzjIeSitBXJAqwi6fsbxDCX0/XrW9LGYu5ytyHNIi5/VhPVxXdk8sqdPASVBqEYmh9cscjUHXzo7cGm4ZnCpiL1LvFPnYw9LAa5LI6e9byeUseO33TC7g1B1sRrTHf9jeM1kTwZkxfO5ATXSn90TBTAJoSST3Noz61Ff/xay7lCOE/CEzW7CFJ4XGVK1h1bCBwOynUgiAxYKNi38nNAH04xVMNwonbYI00GeJYnkdPidwSjbUI583k2jM+22y/Wv1sPJjaiNJzl1ITYZgsaAlDRcddNppL1BHiifsKx//+a9Ds6C33KRwUuV5mllkYU1GLIfXFln20g15VtRYpOXtnP/5jWRf66LCnHWb2ZWdEvWTCvC3ZepTq1C0IbxgCIlq4iYQcPxcfX6S5+f3e8tnnazUI+Hul74A1xmrcBu2R2LpqTTLMjZumbI7EAFMfFUroBjqW99UWGHx8zN7NX9yWUvS/u7MySCG2mXKx5/Gc9rnTpAKnFUkydlF5FhP0uRY6AB4X3rVTJLvltpN8NHjz4LN8+gE9Ht3ixvJtbJpfYmAQFtX6s9oUaV6wgreTsLNtzZ+LpmxmG7YrLx6tA+qADRX80WZ0aBdSv4MZUT7fNTdP6hvoyP6w66i7FvzbqYvLb0h69uVJ+qQesV4UsdZL/4ZzCqxn+H++b3Nr/ohx5qjue5YYtHmJBOYsdoTB2THxc+RxtyrpIfs8IDwfk9qPK9HzAlD23hf5phwHVfd26FnIfuWJpXNx81B4zfi4g8wTchaSxrqDlJpfy4kwGd9dnH9KZN4obfVNdanGtk+NZysx6IXxJyXT90guRyXmXngS7h+TCN3suL8cUhwF/a4OC1AOQyc3s/vxEDHZan5/PBw9pvxApAPaYJ1V/qixLfjbtwrUG3iCtQtxaTe/drT8E5bxH3AHlsixp8z/7PL+n7J9YKoDHsnx649IV8PvnYxBqBfBwiaNb8SoMbqSxcL73uMn23pbfTZvRfDc51fCap0I2J8YWv5qSFji5jOS+xmoi4aoKc4uGKdIc0y3y9oBdLigHl6uaJlc+VS3svIA45sBfdcZZXdpzASlJEAWNiPPVeRHO4d0esJjRT92SlcMOzjwV/AXmxCBBO1nZDeRDfCwXM2TNkqqvGzCUTuZkd06883i4U1yQDdTKTAkpZiq71WPiTZ1YZ2fqPiFoI/2dSPs3zXR1wYCyKvZf7uhQgcZmCgJ39s4pTm/OPtoG+5z/vMt1kfJOtVhy+u0haEJVeApqsOrfdciOW7eH+qoHBphOSQN/TiE73uyH4OpAg6O7OPYbq7mmjjq5AGx80xmb22iwmwBEqBZDIIfQ6dql1bIEnfH8JnM3XNzGSo13bS2+6ocyopvoli+WvJWs3hnglAYh/x0XpbfA6DdBQvKxhb5y9v6v6YMOPYmvbBQCsrnQUlcTwFF9Ol9PWn9Tk+QbpwOhwkQXs0h5cqikcv22qLz0708FKmmExJ2htnPh6DrDHOsvRpLengbX/Kes4VZDkBfVVVx5YoxslvIRbRsjWwvSXDdwmr1/hifn7vtADcn1YouN7hvbITXgIcLD510VckMfacY8UU85PaE4iMLYW0oBolKUYJg8a3xySQEdviEZEiOmEa5UAYJFELshSiFumDTe81rtQtt3KIseKBY7pPJIxeCl0qT5t8L13+ytuOGwlEiTYOgFqZgIyH8jqFsf0Y6hwNRJRp7uaqMnIX+UItQEn7F4WP14Myn52xXQzBvrD6ufMr83EjtuvXxGlYAq1yjOCcLiVAgMwM2bPfW08TnOm/ibqG+UhSrExik9vH5LCSE5JxZHz0JDG2q4eayx9IVoFPLm48HXf2QHEE942ovhFd/kQIE7ZV0j078okTRKlzARc+1sf5aAOiL99maWEh1cIVZ9wqb7eC2fSFaGs9VWXntbh8tnp+xC6Md3hW8/PbHiWA0LrKUYA/+BBTBSt1LQC6kIk2rvR8A1K/8HP8fHeap0Q1YdBBSDrd+IxMXhuvd0nIYlcCi3hvmIS20sLMQGk6B0fhznPidZMPL627Sa5B9TJpY1f0JPkdn7Iq4Umj8jE7UCGjZgu3Az4c43fhmC/o684mXa60A8yv6+HUWwswinY0J9GvGLfx8a4U3gVCduJmPGIZMjS+p5VcTy3PIWarbO38/GZfH2X/9spgoOFuWpTvKP3It9BgKnPd04luqF4gRtecfzK3EfqAIEtKtqXSJKxHBJLVc40B9/33oZnTnJSsaHr2Hm/RNwkor5TvjCDMvnGA8MynvMKlOrpdQECm0dCtkKgffjycIubLMTxCKFcwxAQQ0rJyctCt0c+70QxKKJRr7OrZ9o4F0rx3T3CDfAFa17Z3X1TjLkQzyWcFwglUw5llp/PVzQmAYqe+5HNxnMdObXTj0QNZ1wFKAAWWMTtot3xFRxKKE1FPlITNpb5ax+zbSOLzhIhl7ufnN164g1Z18hfyW+CShqS9vs6Wtks/Of6r0+rXOe5iV/EEZrSxcD5UrFqiWriRAscSCXr8DA9bIFbf//mNmTFw+t4XQaQsJrVc2y+KWs1jJo99XJI6MkPfTatP49Ja2nZOc5NqxXauAsTn814QQM9k+WcjWPaoA9aJr06OjeuCadVkFT/ZbuSD1GT5bbhhkLzNxyiuUWc/u4sX8K4+crwDUMVEQiUfArLxEzcgUnrvvXcAOCqET0bK6xpfso3mA9mdDbGBCqKv/IUw73BNGmBQmnAu/NWnEe4qaZZtVRQHikB3HrqX+bPisKcz38RqZbUs8NbrG6MbJu7zLKz9/JF2Aq3facmGbI+l2pYgWfgQR0LqMBAfO/+tGXR2ZHfKiv3jMe67ccT+mK3aHiqYiaxdkLn0FPOXp/I4KcacWQWyv5zlNHqGhavqlKbSh33HT+WV7oEuKJcFOScjMvddX3pb5RAFDmJCicS0LJWegqo3ZtNwpiuGC7NQG8U9eKTiVmBktIu6CepVFs+HJoXihq4ZkVKBS3pw8cjmfLHIJdTmFFBb3Hk9LpN4NrVkEnQTniyiEIvT8zUZAYbkRFs+AoeNsPm8vZhwm9S7UqjxC+KA+vuKMSCNrUJviESqz66cIu/W9vHiv7QmWEbe0bVBD8MGitqMo4vJ3fib0Xgy7JCEDF7wqfu8gjpEwUD3mLbnNbazPQugR9qATn5rcPGyGwEdgwXDc/htJcrJYMXycO7aU3JDyQWRJ2kD2kOF5WDxsWa+8vTtKhzU+wBvbaUlIyc21cRNXhjJOC8b981Iaa4tOnZRbIBL357UqTknSZzvms8f3ECThe/zp+OcQjrobxG3uHk/TMNOSYzk2OxZMq8DFyff7ySBOytGUFGHmG32ZDMeXsEj5M7tobG+lxBTLhbXatjrzReT7Pbzd/AgKdLP18tUC29wG+bIQCcOoZ+OoCCn4Mxkp7cRI3vC+hsSBQUE9575L7liwTxU56VcvvSzN3KaEfwP/yFjWj+w16GWMTjGtHRmcwqcRVmXkrAJboXJoX3iPDbDzYLe51dYmvcb3fDc+2I2EB4kJtsv2bo96SuTfYoxW9c1llFtC9cBj9i9E1DPrFF/4LYXxCCKSbfPFc4fgGpbm0N4YUCXzVid7Yy1NIIqvj9KznmTOyzkKEtbtvuzy1LxyEz3zvbGNvbIXghZMlZxDX3wMjBxKQzfrFGhGFvSAhFdlQt8m0Nk8HlKkxFPP7/jWjHIY0EWWqw0romJrQ9vr8Sc0dXyxagov9C6MyPjxe8BCuJ9L2OHlFGLiIzG5kkAFPN6K8Jc6Pzpzzna4XgpmqS7XhJVM8CLbSy4eeNwF8WZ+IUkC3vLRQhL3e521mP48Ii3aTChbHcWHv6g7oswxxGXmp20zbC7BUV9JdPj6uBgvSxOS3NCXKJguGLEdyO89rqUm9cIOHVDSyKrFpLOwAmb231Y4ghMoOhiqZoZ/qe4k8m+LZsT/SIsUHsY6tLftkJj+WAuT33M0Kccr6tuQG9++BOIo0+N9NB+AZnw7TXS6HBDRVh3yw7TNozEdJUuIqrLDRKKetvzaFffXgI1+XSRVLepbxBj0DUp5uBQv9CcOerPNZ7O2IlIv+KK1zCTt39AkbTXEKz2lAb15PWk8DpfWm17lagSnG2rrzd+YpJJWgxOR+4pfYYLWwQNUTf5XQjII31e4wR1IbL08ld6aVw4olLrMbPb8MfYewnX0BH1rNAYEb3sN8jefammfut5gXE3rmrAytUi16VAXxNQTDmhg1q65tmvPT1YMbxTuOWg3TNlli+QaLhk+XnsB23n1RmEDdBASNuzqswPU5tAk255HbzDXltLMwhnbMEVzMcE9coH8cA/burMg677QbhHz86qH3bcT6IUywZyW3b1gGvllyj+4G4rKbYqi98EM1zXzbSKmtywqK4MMREdue/zIOnhvlIJPd74PNe75s7L8s3Gtifg7JunpBvGl4ZBpcq452BmEmMoeo0Hq0VzkiWfeCWtCR71SiihUSlIfhYJ39nAMYup7hu2k89H3t9UIWU/vzugEqI5Jq0VXqw1j+x44f3U4ARPU6cDt4XMm18oPYjzFKw4wb0JbxWBw3vwMe+H12O5cMpnDf45vZpyXtpWFDrW41ZliGRyiMN1x3lHvlUI2DNR+3Kpa49nlz/uUrK3vaNkh7a9rhnq9xbDMDVtAVanL8J+TTYXtsQlchKYKoE3phehRHgk7Br+6tJk12vdAHGXlYQGb8WUEjJNtLMbdQMEd5fnRIsm4YWG71Tid/XhNXvBZFiw2PtCJPtVrUWDHKz3BarckZivKRHXzVjA7FVjWpZmfQrK3GlFDpe6KrjltyNla5YX5SD4QDslw0JfwvZsuY/aSnZzMZzZxEBz+IV4QGWcK6TC5vE2X2ob1KkInBjWsxcYDkiUdNclLL7cqzlu6faq4I/6Cz+oXzZIGAPpcz4r/6BhRDYmu0uBasWGDXQ3YXqUoevLtrYv/N7l+FgukD9mUET45zfay0ivvyb6RtCmJu1UCDlq4QeTXqGi9JtJPLui5f1GeacFBd/RZQf8/NKNWyAFiomqApO44wsXhcsccO6aZCNPUcTtHiXzvUtsoEfaIpGMbkBIHIOPpwo5pXviDsXom9fLzbvo8OMB5WtBmdRkOEU3ngSkVQSszFssc/Bdaf9bAW9hew7LzxB00vW9Th4e0u+YeC3JXEIsPDK9XYz1uxpHEq3dmODO736GcU/cG5HpLyDE0uz9vAZr9bYRxhyqC9czwrk6Rjp5hb9BIYKwQ2I7FZEruXYmDEdt9unPpN7u7pplFuM6Pcz6Mh5WkLiHtA8oujOqEmAG++pNVi7mK5i30oAuwHkSY6rqHoVIiWYfH0bfA8JrjZnAq5zU2Ah2pyjZy22UstaQru4dNp3j4DD7jAI1xyxLTJ87wfyDnEjxC4By7k79kCTYLL+H0miJ0HHs8oUQKDarY4EFvDapicaWwL7GUNOrr2yhdSjs48t+u4QmJbM82Y/F3/v7HVN8x/UvRbWT0/IuklWw875tPZkVndxuZUI5jZZeMdtvgXazFCD5SSY7aUh1tNqVEZkYgoAL+DKkmZzlgXHG42sNvlJIynHhSwr1qFSzhjEDIR3XvLn334Jp4XPxNlkziUyyTFdYjMDT7pef+Qk3OTI6WHpLtSU8vdFKrJYwP7KV+75Go6yscSNnfzt1mEL99+sgKbpKOaD5F05ZkecPIFU07piT06BOR/NqfzsNgb73JezHT1hfGkUTLB15vVwDz8DkXZmxFky2HPyBinp9Yygs8WbYZ6G6rVHPBsd0XEp+BqTJaPGqNK1t3FXNRWFNRY28nMRUJT+/tTdS8YUE6mvBmqBZCJ/ZTc+8LCdvy8FPg5jRHGQpcx+xYCNiRsC7Qc3CZ71JLOLXwlRaaPxdxzIn8i/ZhRpYtlS3ajHrA3C4iG7nbU3FRhcx9N2vOCSHa23p0kfMJXkLQAX8/HYB5pzxh1MkBfp6O6a3xXARb7I2feF6IVarjNtemRBxVBPRO9g5kvfLWeQqMih8g/ZlKLW+fnE2L0ef/n24HXPYQyNazH70vqOa0JVw+IjUaAEpIWq9+T3yWq0kDqarJcRiCd/c32ygo/dt4o6NuBEi4ipTAtf2rSwvhmkom5QHZa5hfEte/e7XOm7IVG3zbExu/+l5sfPhYXbKqBOHnE2oPrDeDkFTKzEfeUgQgKX4UEEXgy/S3mITOZwP2R+zBJp6sgleUyj3zlhKsW0RX0/oh06qokYngdOcdwx4qZxvZQIGHwNo6LKNWoKnpi3alil2Lq4wZZ5IirEwT0E6n3C4rWFIDh1dMhSVJ4skJxazq0/HUBNp6WTdVSPp2AMjckr2cYBxd16EdweNLGZidMrixf385pUiaCEMoxbP52+UUuQH8UEiz7fvakAbNz+/k7H4LN+ON4dYLKXte3zezNhA/HqMePR5ZMh6SP3K244y0RGGlcRHyK2UjE9BVdgkdwb5Ls2GOkqzTQHaTUMd71/U/6yRTFBAgMyfI5PcSBMKG9So+xGqrdIMhMYfrpnhQNELbgngoEqtDztEqIVp9v1VKAqX6Rgljxfw2IXOlP67ZM631T0XdjczwS+47EBbkXfYpATnCExBWDu4ZRnOAJD2zTvSLr2ZiEL/PIkpwX01wxY/vfkeZzvUwG7JynYBToHDdRgVn3O0vIb7pQy4Y5H+OnPciTQhUZby4+AHWdMbHfCFHfmqHg0WXDQS1q+PHjJtsS7d8jQEUzlyzG6+f2mI5gnUOEmjFNZvI/+oztj6RDsfFaI10/XGJNa3Vadj+4eh7K74AoKPRNiK0m0gM4Egkavu2Dfz6XABNPgD60hjfS3BhfNFfXuLB273C4XAMzF/Hu06oXEDecQ2BWZZ9n/9r1//+jUteZEv+ZDm659Hxbsxjbs/z4rnw394DphP9+XP7A2GPEcAA39eIviOw581bJ8vdRqDUxzX/2AHQID5nxcP/uep/qEY/2y5pkueD0GdbdWvf3CU/tf/N+L8dyTsfz4r+Z+3An79w6Ak+Frx/edhdHGIky7Pfv2zLXv+r1/DuNUFiLj9+72Kfw+CcNsSp209lPwIJOy1/ffbBAhL/GGtvyiUpv/CUZb/i8Ux6i+e4AmUIRgYF8Vf//W/AVyVknwbMgAA'
                },
                body: JSON.stringify(requestBody),
            }).then((response) => {
                // Parse the JSON response.
                return response.json()
            }).then((data) => {
                return {
                    method: 'POST',
                    url: data.response.signedUrl,
                    fields: [],
                    headers: {},
                }
            })
        }
    });
const submitButton = document.querySelector('.submit-button')
submitButton.addEventListener('click', () => {
    if (!validateFields()) {
      // Do not upload
    } else {
        if (uppy.getFiles().length < 1) {
          console.log('No files were found');
          showSubmitMessage("Submission failure. Please upload a video.", '#FF0000');
        } else {
          uppy.upload()
        }
    }
})


uppy.on('file-added', (file) => {
     const extension = `.${file.name.split('.').pop().toLowerCase()}`;
     console.log(`extension: ${extension}`)
     const isAllowedExtension = videoFileTypes.includes(extension)
     console.log(`is allowed extension: ${isAllowedExtension}`)
     if (isAllowedExtension) {
        showUploadMessage("Your video has been uploaded successfully.", '#60B955')
        const maybeParagraph = document.querySelector('.UppyInputSubmitStatus')
        if (maybeParagraph !== null) {
          maybeParagraph.innerHTML = "";
        }
     } else {
        uppy.removeFile(file.id)
        showUploadMessage("Upload unsuccessful (use .mp4 or .mov).", '#FF0000')
     }
})

uppy.on('upload-success', (file, response) => {
    sendTrackingToNative({ "event": "hmp_uploaded_video", properties: {}});
    window.location.replace('https://hopper-creators-landing-page.webflow.io/submission-page');
})

function showUploadMessage(text, color) {
    const maybeParagraph = document.querySelector('.UppyInputStatus')
    if (maybeParagraph === null) {
        const UppyInput = document.querySelector('.uppyinput')

        const paragraph = document.createElement("P");
        paragraph.className = 'UppyInputStatus';

        const message = document.createTextNode(text);
        paragraph.appendChild(message);

        paragraph.style.color = color;
        paragraph.style.fontFamily = 'Proxima nova, sans-serif';
        paragraph.style.fontSize = '16px';

        UppyInput.prepend(paragraph);
    }  else {
        maybeParagraph.innerHTML = text;
        maybeParagraph.style.color = color;
    }
}
                                                    
function showSubmitMessage(text, color) {
 const maybeParagraph = document.querySelector('.UppyInputSubmitStatus')
 if (maybeParagraph === null) {
   const UppyInputProgress = document.querySelector('.uppyinput-progress')
   const paragraph = document.createElement("P");
   paragraph.className = 'UppyInputSubmitStatus';

   const message = document.createTextNode(text);
   paragraph.appendChild(message);

   paragraph.style.color = color;
   paragraph.style.fontFamily = 'Proxima nova, sans-serif';
   paragraph.style.fontSize = '16px';
   paragraph.style.paddingLeft = '8px';
   paragraph.style.marginBottom = '0px';

   UppyInputProgress.prepend(paragraph);
 } else {
   maybeParagraph.innerHTML = text;
   maybeParagraph.style.color = color;
 }
}


function validateFields() {
    let name = document.getElementById('Name') // validate
    let email = document.getElementById('email') // validate
    let isValid = true
    
    console.log(`Name: ${name.value}`)
    console.log(`Email: ${email.value}`)
    
    if (!name.value.length > 0) {
        name.setCustomValidity("Input your first and last name");
        isValid = false
    } else {
        name.setCustomValidity("");
    }
    if (!email.value.length > 0) {
        email.setCustomValidity("Input your email");
        isValid = false
    } else if (email.validity.typeMismatch) {
        email.setCustomValidity("Input a valid email");
        isValid = false
    } else{
        email.setCustomValidity("");
    }
    return isValid
}
