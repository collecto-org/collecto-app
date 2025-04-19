import React from "react"

interface TagsProps {
    tags: string[]
}
export default function Tags({ tags = [] }: TagsProps){
    return (
        <div className="flex gap-2 flex-wrap">
        {tags.map((tag, index) => (
            <span key={index} className="text-xs px-2 py-1 bg-lightgray rounded-full text-darkblue">
              #{tag}
            </span>
          ))}
        </div>
        )
}


