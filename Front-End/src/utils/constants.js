export const branchesList = ["lob14","lob15"]

export const modalExitButtonOptions = [{
    text: "Yes",
    buttonAction: () => {
    }
},
{
    text: "Yes",
    buttonAction: () => {

    }
}]
export const modalInfoButtonOptions = [{
    text: "Close",
    buttonAction: () => {

    }
}]

export const categoryListObject = [
    {
        "name": "Contracts & Leasing",
        "services": [
            54
        ]
    },
    {
        "name": "Customer Service",
        "services": [
            46,
            48,
            60
        ]
    },
    {
        "name": "Employee Affairs",
        "services": [
            38,
            50,
            58,
            81
        ]
    },
    {
        "name": "Asset & Property Management",
        "services": [
            40,
            42,
            44,
            68
        ]
    },
    {
        "name": "Licensing",
        "services": [
            69,
            70
        ]
    },
    {
        "name": "Registration & Offshore",
        "services": [
            62,
            64,
            71
        ]
    },
    {
        "name": "Sales",
        "services": [
            72,
            73,
            74,
            75,
            76
        ]
    },
    {
        "name": "Workforce Affairs",
        "services": [
            77,
            78,
            79,
            80
        ]
    }
]

export const appiontmentsList = [
    {
        "id": 171,
        "externalId": "251",
        "qpCalendarId": 251,
        "branchId": 4,
        "resourceId": 18,
        "resourceName": "staff1",
        "resourceGroupId": null,
        "resourceGroupName": null,
        "services": [
            {
                "id": 48,
                "name": "Customer Service — Payments / Company Reinstatement",
                "description": "A meeting with Jafza Customer Service to clarify queries related to payments and company reinstatement.\n",
                "duration": 0
            }
        ],
        "resourceServiceDecorators": [],
        "customers": [
            {
                "id": 338,
                "publicId": "78589d6a9b2a2203eaec80f979db718a155ea589759e64cd48e39c486d0b7921",
                "firstName": "omar",
                "lastName": "barakat",
                "cardNumber": null,
                "consentIdentifier": null,
                "consentTimestamp": null,
                "retentionPolicy": "appointment_days",
                "lastInteractionTimestamp": "2024-02-13T15:50:00.000+0000",
                "deletionTimestamp": "2024-05-13T15:50:00.000+0000",
                "properties": {
                    "customField5": "78589d6a9b2a2203eaec80f979db718a155ea589759e64cd48e39c486d0b7921",
                    "phoneNumber": "+971553208899",
                    "created": 1707463281752,
                    "customField4": "omar.barakat@infracom.me",
                    "custom": "{\"lang\":\"en\"}",
                    "dateOfBirth": "1995-01-01",
                    "email": "omar.barakat@infracom.me"
                }
            }
        ],
        "startTime": "2024-02-13T19:45:00",
        "endTime": "2024-02-13T19:50:00",
        "updateTime": "2024-02-13T12:04:25",
        "status": "CREATED",
        "title": "",
        "properties": {
            "publicId": "340781df6630a4a11cd79b16ebebbc251034295c2da954ea04063d1a577ed0d1",
            "notes": ""
        },
        "userName": null,
        "branch": {
            "id": 4,
            "name": "Jafza 14"
        }
    }
]

const servicesList = [
    {
        "id": 54,
        "internalName": "Lease Related Services",
        "externalName": "Lease Related Services",
        "internalDescription": "To follow up on an active Jafza Service Request (SR) or address any general enquiries related to Contracts & Leasing.\n",
        "externalDescription": null,
        "targetTransactionTime": 0
    },
    {
        "id": 46,
        "internalName": "Customer Service — Downsize / Exit Interviews",
        "externalName": "Customer Service — Downsize / Exit Interviews",
        "internalDescription": "A meeting with Jafza Customer Service to clarify queries related to company downsizing and or attend exit interviews.\n",
        "externalDescription": null,
        "targetTransactionTime": 0
    },
    {
        "id": 48,
        "internalName": "Customer Service — Payments / Company Reinstatement",
        "externalName": "Customer Service — Payments / Company Reinstatement",
        "internalDescription": "A meeting with Jafza Customer Service to clarify queries related to payments and company reinstatement.\n",
        "externalDescription": null,
        "targetTransactionTime": 0
    },
    {
        "id": 60,
        "internalName": "Other Customer Services (NOCS, Complaints, etc.)",
        "externalName": "Other Customer Services (NOCS, Complaints, etc.)",
        "internalDescription": "A face-to-face meeting with Jafza Customer Service to clarify queries related to NOCs, complaints and others. \n",
        "externalDescription": null,
        "targetTransactionTime": 0
    },
    {
        "id": 38,
        "internalName": "Admin Services - Employee affairs",
        "externalName": "Admin Services - Employee affairs",
        "internalDescription": "To follow up on an active Jafza Service Request (SR) or address any general enquiries related to employee affairs.\n",
        "externalDescription": null,
        "targetTransactionTime": 0
    },
    {
        "id": 50,
        "internalName": "Government Affairs & Golden Visa",
        "externalName": "Government Affairs & Golden Visa",
        "internalDescription": "An online meeting to follow up on an existing Jafza Service Request (SR) or address any enquiries related to Government Affairs & Golden visa.\n",
        "externalDescription": null,
        "targetTransactionTime": 0
    },
    {
        "id": 58,
        "internalName": "Manpower Contract Attestation",
        "externalName": "Manpower Contract Attestation",
        "internalDescription": "A planned face-to-face meeting with a Jafza expert for the purpose of completing contract attestation.\n",
        "externalDescription": null,
        "targetTransactionTime": 0
    },
    {
        "id": 40,
        "internalName": "APM Service - EOL Doc Submission",
        "externalName": "APM Service - EOL Doc Submission",
        "internalDescription": "A face-to-face meeting with the Jafza Asset & Property Management Team to submit your company's End-of-Lease documents.\n",
        "externalDescription": null,
        "targetTransactionTime": 0
    },
    {
        "id": 42,
        "internalName": "APM Service - Key Handover",
        "externalName": "APM Service - Key Handover",
        "internalDescription": "A face-to-face meeting with the Jafza Asset & Property Management Team to hand over your facility keys.\n",
        "externalDescription": null,
        "targetTransactionTime": 0
    },
    {
        "id": 44,
        "internalName": "APM Service - NOC Clarifications",
        "externalName": "APM Service - NOC Clarifications",
        "internalDescription": "A meeting with the Jafza Asset & Property Management Team to address queries regarding NOCs.\n",
        "externalDescription": null,
        "targetTransactionTime": 0
    },
    {
        "id": 68,
        "internalName": "APM Service - NOC Submission/Collection",
        "externalName": "APM Service - NOC Submission/Collection",
        "internalDescription": "A face-to-face meeting with the Jafza Asset & Property Management Team to deliver or collect your company NOC documents. \n",
        "externalDescription": null,
        "targetTransactionTime": 600
    },
    {
        "id": 69,
        "internalName": "Jafza - License Enquiry",
        "externalName": "Jafza - License Enquiry",
        "internalDescription": "An online meeting to follow up on an existing Jafza Service Request (SR) or address any enquiries related to Jafza license.\n",
        "externalDescription": null,
        "targetTransactionTime": 0
    },
    {
        "id": 70,
        "internalName": "NIP - License Enquiry",
        "externalName": "NIP - License Enquiry",
        "internalDescription": "An online meeting to follow up on an existing Jafza Service Request (SR) or address any enquiries related to NIP license.\n",
        "externalDescription": null,
        "targetTransactionTime": 0
    },
    {
        "id": 62,
        "internalName": "Registration & Offshore Services",
        "externalName": "Registration & Offshore Services",
        "internalDescription": "A meeting with a Jafza expert to clarify queries related to Registration and offshore services.\n",
        "externalDescription": null,
        "targetTransactionTime": 0
    },
    {
        "id": 64,
        "internalName": "Courier Collection/Delivery - Offshore",
        "externalName": "Courier Collection/Delivery - Offshore",
        "internalDescription": "A planned face-to-face meeting with a Jafza expert for exchanging Offshore company documents.\n",
        "externalDescription": null,
        "targetTransactionTime": 0
    },
    {
        "id": 71,
        "internalName": "Registration/Offshore - Signature Verification",
        "externalName": "Registration/Offshore - Signature Verification",
        "internalDescription": "A planned face-to-face meeting with a Jafza expert for the purpose of completing Signature verification.\n",
        "externalDescription": null,
        "targetTransactionTime": 600
    },
    {
        "id": 72,
        "internalName": "New Company Set-up",
        "externalName": "New Company Set-up",
        "internalDescription": "A meeting with the Jafza Sales Team to discuss the requirements for setting up a new company.\n",
        "externalDescription": null,
        "targetTransactionTime": 0
    },
    {
        "id": 73,
        "internalName": "Existing Company Expansion",
        "externalName": "Existing Company Expansion",
        "internalDescription": "A meeting with the Jafza Sales Team to discuss your company's expansion needs.\n",
        "externalDescription": null,
        "targetTransactionTime": 0
    },
    {
        "id": 74,
        "internalName": "Follow-up - Service Request/Lead",
        "externalName": "Follow-up - Service Request/Lead",
        "internalDescription": "A meeting with the Jafza Sales Team to follow-up on your new company set-up or company expansion requests.\n",
        "externalDescription": null,
        "targetTransactionTime": 0
    },
    {
        "id": 75,
        "internalName": "Document Collection / Submission",
        "externalName": "Document Collection / Submission",
        "internalDescription": "A face-to-face meeting with the Jafza Sales Team to deliver or collect your company set-up /expansion documents. \n",
        "externalDescription": null,
        "targetTransactionTime": 0
    },
    {
        "id": 77,
        "internalName": "WPS Service",
        "externalName": "WPS Service",
        "internalDescription": "An online meeting to follow up on an existing Jafza Service Request (SR) or address any enquiries related to WPS services.\n",
        "externalDescription": null,
        "targetTransactionTime": 0
    },
    {
        "id": 78,
        "internalName": "Labour Dispute",
        "externalName": "Labour Dispute",
        "internalDescription": "An online meeting to follow up on an existing Jafza Service Request (SR) or address any enquiries related to Labour disputes.\n",
        "externalDescription": null,
        "targetTransactionTime": 0
    },
    {
        "id": 79,
        "internalName": "Workforce Affairs - General Enquiry",
        "externalName": "Workforce Affairs - General Enquiry",
        "internalDescription": "An online meeting to follow up on an existing Jafza Service Request (SR) or address any enquiries related to Workforce affairs.\n",
        "externalDescription": null,
        "targetTransactionTime": 0
    },
    {
        "id": 80,
        "internalName": "Workforce Affairs - Company Enquiry",
        "externalName": "Workforce Affairs - Company Enquiry",
        "internalDescription": "An online meeting to follow up on an existing Jafza Service Request (SR) or address any workforce affair enquiries related to your company. \n",
        "externalDescription": null,
        "targetTransactionTime": 0
    },
    {
        "id": 81,
        "internalName": "Admin Doc - Collection/Submission",
        "externalName": "Admin Doc - Collection/Submission",
        "internalDescription": "A face-to-face meeting with the Jafza Employee Affairs Team to deliver or collect your company or employee documents. \n",
        "externalDescription": null,
        "targetTransactionTime": 900
    },
    {
        "id": 76,
        "internalName": "General Sales Enquiry",
        "externalName": "General Sales Enquiry",
        "internalDescription": "A meeting with the Jafza Sales Team to address any general queries you have about Jafza and its product solutions. \n",
        "externalDescription": null,
        "targetTransactionTime": 0
    }
]