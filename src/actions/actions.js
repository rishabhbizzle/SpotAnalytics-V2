'use server'

import { connect } from "@/dgConfig/dbConfig";
import Updates from "@/models/updatesModel";
import { currentUser } from '@clerk/nextjs';
import { revalidatePath } from "next/cache";

export const getAllBlogsFromDb = async (count) => {
    try {
        await connect()
        const blogs = count ? await Updates.find({}).limit(count).sort({ createdAt: -1 }): await Updates.find({}).sort({ createdAt: -1 })

        // convert the blogs to json
        const data = JSON.parse(JSON.stringify(blogs))
        return data


    } catch (error) {
        console.log(error)
        return null
    }
}

export const getBlogPostFromDb = async (slug) => {
    try {
        await connect()
        if (!slug) {
            return null
        }
        const blog = await Updates.findOne({ slug: slug })
        return blog
    } catch (error) {
        console.log(error)
        return null
    }
}


export const createBlogPostInDb = async (blog) => {
    try {
        const user = await currentUser();
        console.log(user, user?.firstName, user?.id )
        if (!user) {
            return { data: null, error: 'User not found' }
        }

        // blog is of formdata type so get the values from it
        const title = blog.get('title')
        const content = blog.get('content')
        const image = blog.get('image')
        const status = blog.get('status') || 'draft'
        const pin = blog.get('pin') || false
        await connect()
        const data = {
            title,
            content,
            image,
            status,
            pin,
            slug: title.replace(/\s+/g, '-').toLowerCase(),
            author: user?.firstName || 'Admin'
        }
        console.log(data)
        const newBlog = Updates.create(data)
        revalidatePath('/admin')
        return { data: 'Blog created', error: null }
    } catch (error) {
        return { data: null, error: error?.message }
    }
}