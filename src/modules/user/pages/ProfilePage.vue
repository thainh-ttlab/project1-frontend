<template>
    <div style="position: relative">
        <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
            <el-card>
                <el-form>
                    <ValidationProvider
                        rules="required|max:255"
                        name="Name"
                        v-slot="{ errors }"
                    >
                        <el-form-item label="Name" required :error="errors[0]">
                            <el-input
                                v-model="profile.name"
                                placeholder="William Smith"
                            />
                        </el-form-item>
                    </ValidationProvider>

                    <ValidationProvider
                        rules="max:255"
                        name="Address"
                        v-slot="{ errors }"
                    >
                        <el-form-item label="Address" :error="errors[0]">
                            <el-input
                                v-model="profile.address"
                                placeholder="Street, City..."
                            />
                        </el-form-item>
                    </ValidationProvider>

                    <ValidationProvider
                        rules="required|email|max:255"
                        name="Email"
                        v-slot="{ errors }"
                    >
                        <el-form-item label="Email" required :error="errors[0]">
                            <el-input
                                v-model="profile.email"
                                placeholder="demo@gmail.com"
                            />
                        </el-form-item>
                    </ValidationProvider>

                    <ValidationProvider
                        rules="numeric|min:9|max:10"
                        name="Phone"
                        v-slot="{ errors }"
                    >
                        <el-form-item label="Phone" :error="errors[0]">
                            <el-input v-model="profile.phone" placeholder="09123456789" />
                        </el-form-item>
                    </ValidationProvider>

                    <el-form-item label="Avatar">
                        <div class="form-group">
                            <label for="file" style="visibility: hidden">Avatar</label>
                            <div id="file" class="input-group">
                                <div class="custom-file">
                                    <input
                                        type="file"
                                        ref="fileInput"
                                        @input="onFileChange"
                                        id="customFile"
                                        class="custom-file-input"
                                        accept="image/*,.mng"
                                    />
                                    <label
                                        class="custom-file-label"
                                        for="customFile"
                                        data-browse="Browse"
                                    >
                                        {{ inputFilePlaceholder }}
                                    </label>
                                </div>
                                <el-button
                                    @click.native.prevent="clearForm"
                                    class="reset-file"
                                >
                                    Reset File
                                </el-button>
                            </div>
                            <div class="preview" v-if="previewImg || profile.avatar">
                                <img
                                    :src="previewImg ? previewImg : profile.avatar"
                                    style="max-width: 300px; max-height: 300px"
                                    alt=""
                                />
                            </div>
                        </div>
                    </el-form-item>

                    <el-form-item>
                        <el-button
                            type="success"
                            @click.prevent="handleSubmit(updateProfile)"
                        >
                            Save
                        </el-button>
                        <el-button @click.prevent="discardProfile">Discard</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </ValidationObserver>
    </div>
</template>

<script>
import TokenService from '@/helpers/token'
import UserRepository from '@/repositories/UserRepository'
import FileRepository from '@/repositories/FileRepository'

export default {
    data() {
        return {
            profile: {},
            profileDefault: {},
            file: null,
            previewImg: null,
            maxUploadFileSize: 5 * 1024 * 1024,
            inputFilePlaceholder: 'Choose File...',
            avatarName: null,
        }
    },
    created() {
        this.getProfile()
    },
    methods: {
        async getProfile() {
            const id = TokenService.getUser()?._id
            const loader = this.$loading({})
            const response = await UserRepository.detail(id)
            loader.close()
            this.profile = Object.assign({}, response?.data?.items || {})
            this.profileDefault = Object.assign({}, response?.data?.items || {})
        },
        async updateProfile() {
            const loader = this.$loading({})
            if (this.file) {
                await this.uploadImage()
            }
            const params = {
                name: this.profile.name,
                email: this.profile.email,
                phone: this.profile.phone,
                address: this.profile.address,
            }
            if (this.avatarName) params.avatar = this.avatarName
            const response = await UserRepository.update(
                TokenService.getUser()?._id,
                params,
            )
            loader.close()
            if (response?.success) {
                this.clearFile()
                return this.$swal({
                    title: 'Profile',
                    text: 'Update Profile Successfully.',
                    confirmButtonText: 'Close',
                })
            } else {
                this.clearForm()
                return this.$swal({
                    title: 'Profile',
                    text: response?.message || '',
                    confirmButtonText: 'Close',
                })
            }
        },
        discardProfile() {
            this.profile = Object.assign({}, this.profileDefault)
            this.clearForm()
        },
        async uploadImage() {
            const response = await FileRepository.uploadOneFile(this.file)
            if (response?.success) {
                this.avatarName = response.data.filename || null
            } else {
                this.clearForm()
                return this.$swal({
                    title: 'Upload File',
                    text: response?.message || '',
                    confirmButtonText: 'Close',
                })
            }
        },
        onFileChange() {
            this.previewImg = ''
            this.file = null
            const input = this.$refs.fileInput
            const files = input.files
            if (files && files.length > 0) {
                if (files[0].size > this.maxUploadFileSize) {
                    this.clearForm()
                    return this.$swal({
                        title: 'Upload File',
                        text: 'You cannot upload a file larger than 5MB',
                        confirmButtonText: 'Close',
                    })
                } else {
                    this.file = files[0]
                    const fileReader = new FileReader()

                    fileReader.onload = e => {
                        this.previewImg = e?.target?.result
                    }
                    fileReader.readAsDataURL(this.file)
                    this.inputFilePlaceholder = this.file?.name || ''
                }
            }
        },
        clearForm() {
            this.inputFilePlaceholder = 'Choose File...'
            this.$refs.fileInput.value = null
            this.previewImg = this.profile.avatar
            this.file = null
            this.avatarName = null
        },
        clearFile() {
            this.file = null
            this.inputFilePlaceholder = 'Choose File...'
            this.$refs.fileInput.value = null
        },
    },
}
</script>
<style scoped lang="scss">
.el-card {
    margin-top: 50px;
}
#file {
    display: flex;
    input {
        opacity: 0;
    }
    .custom-file {
        position: relative;
        display: flex;
        width: calc(100% - 105px);
    }
    .custom-file-label {
        border: 1px solid #dcdfe6;
        border-right: none;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        z-index: 1;
        padding: 0 85px 0 15px;
        color: #c0c4cc;
        background: #ffffff;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        height: 38px;
        cursor: pointer;
        &:after {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            z-index: 3;
            display: flex;
            align-items: center;
            padding: 0.375rem 0.75rem;
            color: #495057;
            background-color: #e9ecef;
            content: attr(data-browse);
            border-left: inherit;
        }
    }
    ::v-deep .reset-file {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        width: 105px;
    }
}
.preview {
    margin-top: 10px;
    display: inline-flex;
}
.pan-thumb {
    width: 80px;
    height: 80px;
    position: absolute;
    z-index: 999;
    background-position: center center;
    background-size: cover;
    border-radius: 100%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    transform: translateY(-50%);
    margin-left: 20px;
}
</style>
