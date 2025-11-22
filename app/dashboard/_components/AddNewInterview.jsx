"use client";
import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModal";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";

const AddNewInterview = () => {
  const [openDailog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  /** 
   * CLEAN & EXTRACT PURE JSON EVEN IF AI RETURNS EXTRA TEXT
   */
  const extractJSON = (text) => {
    let cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // Match anything between [ .... ]
    const jsonMatch = cleaned.match(/\[[\s\S]*\]/);

    if (!jsonMatch) return null;

    return jsonMatch[0];
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const InputPrompt = `
      You are an AI interview generator.
      Generate EXACTLY 5 interview questions and answers in VALID JSON array format.
      STRICT RULES:
      - DO NOT add text outside JSON.
      - DO NOT add markdown or explanation.
      - MUST return a JSON array only.
      - Each item must have "Question" and "Answer" fields.

      Job Position: ${jobPosition}
      Job Description: ${jobDesc}
      Years of Experience: ${jobExperience}
    `;

    try {
      const result = await chatSession.sendMessage(InputPrompt);

      const aiText = result.response.text();
      const jsonOnly = extractJSON(aiText);

      if (!jsonOnly) {
        alert("AI did not return JSON. Try again.");
        setLoading(false);
        return;
      }

      let parsed;

      try {
        parsed = JSON.parse(jsonOnly);
      } catch (error) {
        console.error("Invalid JSON returned:", jsonOnly);
        alert("AI returned invalid JSON.");
        setLoading(false);
        return;
      }

      setJsonResponse(parsed);

      // Save to DB
      const resp = await db
        .insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: JSON.stringify(parsed),
          jobPosition,
          jobDesc,
          jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("YYYY-MM-DD"),
        })
        .returning({ mockId: MockInterview.mockId });

      if (resp?.length > 0) {
        setOpenDialog(false);
        router.push("/dashboard/interview/" + resp[0].mockId);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div>
      <div
        className="p-10 rounded-lg border bg-secondary hover:scale-105 hover:shadow-sm transition-all cursor-pointer"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>

      <Dialog open={openDailog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interview
            </DialogTitle>

            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div className="my-3">
                  <h2>Add details about the job position, description and experience</h2>

                  <div className="mt-7 my-3">
                    <label className="text-black">Job Role / Position</label>
                    <Input
                      className="mt-1"
                      placeholder="Ex. Full Stack Developer"
                      required
                      onChange={(e) => setJobPosition(e.target.value)}
                    />
                  </div>

                  <div className="my-5">
                    <label className="text-black">Job Description / Tech Stack</label>
                    <Textarea
                      placeholder="Ex. React, Node.js, MySQL"
                      required
                      onChange={(e) => setJobDesc(e.target.value)}
                    />
                  </div>

                  <div className="my-5">
                    <label className="text-black">Years of Experience</label>
                    <Input
                      className="mt-1"
                      placeholder="Ex. 5"
                      type="number"
                      max="50"
                      required
                      onChange={(e) => setJobExperience(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex gap-5 justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>

                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" />
                        Generating From AI...
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;
